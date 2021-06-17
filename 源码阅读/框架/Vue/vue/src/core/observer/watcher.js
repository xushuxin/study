/* @flow */

import {
  warn,
  remove,
  isObject,
  parsePath,
  _Set as Set,
  handleError,
  noop
} from '../util/index'

import { traverse } from './traverse'
import { queueWatcher } from './scheduler'
import Dep, { pushTarget, popTarget } from './dep'

import type { SimpleSet } from '../util/index'

let uid = 0

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
export default class Watcher {
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  user: boolean;
  lazy: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: SimpleSet;
  newDepIds: SimpleSet;
  before: ?Function;
  getter: Function;
  value: any;

  constructor (
    vm: Component,
    //expOrFn：
    //如果是computedWatcher,会是当前计算属性的get函数
    //如果是userWatcher,会是一个字符串，内容是一个属性名或者是表达式（.隔开的）
    //如果是renderWatcher,会是一个updateComponent函数（）
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this
    }
    vm._watchers.push(this)
    // options
    if (options) {
      this.deep = !!options.deep//默认false
      this.user = !!options.user
      this.lazy = !!options.lazy//computedWatcher的lazy配置项为true
      this.sync = !!options.sync//默认false
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    //+ 如果是computedWatcher，expOrFn获得的是用户设置的get函数
    //+ 如果是renderWatcher expOrFn获取的是updateComponent函数
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
    //+ 如果是userWathcher expOrFn获取的是用户配置的watch对象中的key，这个key可以是“.”分隔的表达式
      this.getter = parsePath(expOrFn)//返回值是一个函数，函数接收一个对象，执行返回一个通过expOrFn获取的属性值
      if (!this.getter) {
        this.getter = noop
        process.env.NODE_ENV !== 'production' && warn(
          `Failed watching path: "${expOrFn}" ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }
    //首次如果是computedWatcher，就不用触发对应属性的getter，因为initComputed时自己添加依赖
    //如果是renderWatcher 需要执行updateComponent函数
    //如果是userWatcher，获取当前组件实例上用户指定的响应式属性值,触发该属性的getter，在getter中添加该属性为当前watcher的依赖
    this.value = this.lazy
      ? undefined
      : this.get()
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get () {
    //watcher入栈，Dep.target指向当前watcher
    //如果是computedWatcher,Dep.target会指向当前computedWatcher
    //为什么计算属性中在异步任务中编写的响应式属性不会作为依赖？
    //答：pushTarget，getter,popTarget方法的调用都是同步的，调用过getter之后，popTarget中将Dep.target指向undefined，乳沟getter中有异步操作，异步操作中的响应式属性的get触发时Dep.target已经不再指向当前computedWatcher了，就不会添加对应属性为computedWatcher的依赖了
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      //调用当前对象的get方法
      //1.如果是computedWatcher，调用用户编写的get函数获取返回值，这步操作会触发get函数中的响应式数据的getter，从而将响应式属性添加为computedWatcher的依赖
      //+ 当响应式属性发生改变触发setter时，就会触发computedWatcher的update，把dirty设置为true；同时响应式属性的renderWatcher会触发组件更新（异步），然后组件更新时会触发计算属性的getter，在getter中因为dirty为true会调用evaluate，获取最新的计算结果，最后把dirty设置为false；
      //+ 如果响应式属性未发生改变，就不会触发computedWatcher的update，dirty为false，组件更新仍然会触发计算属性的getter，但是不会触发evaluate，返回值为旧值
      //2.如果是renderWatcher 调用updateComponent函数（调用当前组件实例的update方法，传入当前实例的render方法生成的虚拟dom），没有返回值
      //3.如果是userWatcher则，调用之前返回的一个解析函数，传入vm，获取到vm上的对应属性值（这里会触发属性的getter，从而添加当前该属性为userWatcher的依赖）
      value = this.getter.call(vm, vm)
      //从这一步，我们可以看出一个属性可能会被3种watcher依赖
      //三种watcher的分工是不同的:
      //+ renderWatcher用于数据改变时，触发更新视图
      //+ computedWatcher用于监听自定义计算属性的getter中使用过的响应式数据是否发生改变
      //+ userWatcher 用于在数据发生改变时触发用户的操作
      //还可以看出，一个watcher也可以依赖多个属性（比如计算属性的get函数执行时，可能会有多个响应式属性，这些响应式属性都会被当前computedWatcher添加为依赖，只要其中一个依赖触发setter，就会触发computedWatcher的update方法）
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      //user Watcher 设置了deep:true配置项才会执行，会循环并递归获取对象（有可能是数组中的对象）的每一层属性的值，触发对应getter，将所有属性都添加为当前watcher的依赖
      if (this.deep) {
        traverse(value)
      }
      popTarget()//watcher出栈，修改Dep.target指向
      this.cleanupDeps()
    }
    return value//将getter函数的返回值返回
  }

  /**
   * Add a dependency to this directive.
   */
  //属性的getter触发时调用
  //+ 会把dep存储到当前water实例上的dep数组中（记录watcher依赖了哪些属性）
  //+ 然后把当前watcher添加到dep的依赖数组（记录属性被哪些watcher添加为依赖）
  addDep (dep: Dep) {
    //获取id
    const id = dep.id
    //如果不存在这个id
    if (!this.newDepIds.has(id)) {
      //添加id
      this.newDepIds.add(id)
      //watcher中通过一个数组来记录当前watcher依赖了哪些属性
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        //调用传过来的dep实例的addSub方法将当前watcher添加到订阅数组（this.subs.push(watcher)）
        dep.addSub(this)
      }
    }
  }

  /**
   * Clean up for dependency collection.
   */
  cleanupDeps () {
    let i = this.deps.length
    //遍历数组
    while (i--) {
      //获取一个依赖
      const dep = this.deps[i]
      //如果当前watcher的依赖数组中没有这个dep
      if (!this.newDepIds.has(dep.id)) {
        //调用dep的removeSub方法从dep的订阅数组中删除当前watcher实例
        dep.removeSub(this)
      }
    }
    let tmp = this.depIds//缓存旧的存储依赖Id的Set
    this.depIds = this.newDepIds//设置为新的存储依赖Id的Set
    this.newDepIds = tmp//获得旧的存储依赖Id的Set
    this.newDepIds.clear()//清除旧的set所有存储值(依赖Id)
    tmp = this.deps//缓存旧的依赖数组
    this.deps = this.newDeps//设置新的依赖数组
    this.newDeps = tmp//获取旧的依赖数组
    this.newDeps.length = 0//清空旧的依赖数组
  }

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  //依赖属性的setter中dep.notify()的时候，会执行所有关联的watcher的update方法
  update () {
    /* istanbul ignore else */
    if (this.lazy) {//如果是computedWatcher
      this.dirty = true
    } else if (this.sync) {//sync默认是false
      this.run()
    } else {
      //如果是renderWatcher或者userWatcher
      queueWatcher(this)
    }
  }

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  // nextTick 刷新队列的函数中执行
  //  如果是renderWatcher,get内部实际会调用updateComponent方法更新组件
  //  如果是userWatcher,get内部实际会调用用户传入的函数
  run () {
    if (this.active) {//默认为true
      const value = this.get()
      //如果watcher存储的值发生改变
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        const oldValue = this.value
        this.value = value
        if (this.user) {//如果是userWatcher
          // 调用用户传入的watcher函数
          try{
            this.cb.call(this.vm, value, oldValue)
          } catch (e) {//捕捉错误，做提示
            handleError(e, this.vm, `callback for watcher "${this.expression}"`)
          }
        } else {
          // 调用renderWatcher/computedWatcher的初始化时传入的noop函数（空函数）
          this.cb.call(this.vm, value, oldValue)
        }
      }
    }
  }

  /**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */
  //这个是只有计算属性才会调用(在)
  evaluate () {
    //设置当前watcher的值为获取的值
    //会触发对应属性的get函数执行
    this.value = this.get()
    this.dirty = false
  }

  /**
   * Depend on all deps collected by this watcher.
   */
  depend () {
    let i = this.deps.length
    while (i--) {
      //调用每个dep的depend，把当前wachter添加到一个属性的依赖数组
      //内部执行的是Dep.target.addDep,也就是给的当前新创建的watcher添加依赖(所谓添加依赖，其实就是，把当前watcher添加到对应属性的dep对象上的subs数组中，当依赖的setter触发时，会执行dep.notity,dep.notify内部会比那里subs数组，执行每个watcher的update函数，这就是通知更新)
      this.deps[i].depend()
    }
  }

  /**
   * Remove self from all dependencies' subscriber list.
   */
  teardown () {
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
      //如果组件不是被销毁
      if (!this.vm._isBeingDestroyed) {
        //从实例的watcher数组中删除自身
        remove(this.vm._watchers, this)
      }
      //从所有依赖的订阅列表中删除自身
      let i = this.deps.length
      while (i--) {
        this.deps[i].removeSub(this)
      }
      this.active = false
    }
  }
}

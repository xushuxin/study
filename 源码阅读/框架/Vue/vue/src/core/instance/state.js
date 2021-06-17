/* @flow */

import config from '../config'
import Watcher from '../observer/watcher'//使用了Watcher类
import Dep, { pushTarget, popTarget } from '../observer/dep'
import { isUpdatingChildComponent } from './lifecycle'

import {
  set,
  del,
  observe,
  defineReactive,
  toggleObserving
} from '../observer/index'

import {
  warn,
  bind,
  noop,
  hasOwn,
  hyphenate,
  isReserved,
  handleError,
  nativeWatch,
  validateProp,
  isPlainObject,
  isServerRendering,
  isReservedAttribute
} from '../util/index'

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}

export function proxy (target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  //如果用户配置了computed配置项，则初始化computed
  if (opts.computed) initComputed(vm, opts.computed)
  //如果用户配置了watch配置项，则初始化watch
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}

function initProps (vm: Component, propsOptions: Object) {
  const propsData = vm.$options.propsData || {}
  const props = vm._props = {}
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  const keys = vm.$options._propKeys = []
  const isRoot = !vm.$parent
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false)
  }
  for (const key in propsOptions) {
    keys.push(key)
    const value = validateProp(key, propsOptions, propsData, vm)
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      const hyphenatedKey = hyphenate(key)
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          `"${hyphenatedKey}" is a reserved attribute and cannot be used as component prop.`,
          vm
        )
      }
      defineReactive(props, key, value, () => {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            `Avoid mutating a prop directly since the value will be ` +
            `overwritten whenever the parent component re-renders. ` +
            `Instead, use a data or computed property based on the prop's ` +
            `value. Prop being mutated: "${key}"`,
            vm
          )
        }
      })
    } else {
      defineReactive(props, key, value)
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, `_props`, key)
    }
  }
  toggleObserving(true)
}

function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }
  // proxy data on instance
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          `Method "${key}" has already been defined as a data property.`,
          vm
        )
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        `The data property "${key}" is already declared as a prop. ` +
        `Use prop default value instead.`,
        vm
      )
    } else if (!isReserved(key)) {
      proxy(vm, `_data`, key)
    }
  }
  // observe data
  observe(data, true /* asRootData */)
}

export function getData (data: Function, vm: Component): any {
  // #7573 disable dep collection when invoking data getters
  pushTarget()
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, `data()`)
    return {}
  } finally {
    popTarget()
  }
}

const computedWatcherOptions = { lazy: true }

function initComputed (vm: Component, computed: Object) {
  // $flow-disable-line
  //创建一个空的对象，用于存放所有的计算属性的watcher
  const watchers = vm._computedWatchers = Object.create(null)
  // computed properties are just getters during SSR
  const isSSR = isServerRendering()//是否为SSR，正常为false
  //遍历传入的computed对象，遍历过程中:
  //1.为每一个计算属性创建一个computedWatcher;
  //2.用户传递给每个计算属性的直接是一个函数或者是包含get函数的对象，获取这个函数，称之为计算属性的getter，然后传递给computedWatcher的getter，并在computedWatcher的get方法被调用时执行getter;
  //3.使用 Object.defineProperty，定义每一个计算属性的getter为自己创建的computedGetter函数(会在读取computed属性时触发，页面更新时都会触发);
  //4.自己创建的computedGetter函数中：
  // + 获取对应的computedWatcher，
  // + 如果dirty属性设置为true,则调用evaluate方法重新计算
  for (const key in computed) {
    const userDef = computed[key]//单个computed
    //获取到当前计算属性的getter
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        `Getter is missing for computed property "${key}".`,
        vm
      )
    }

    if (!isSSR) {//不是SSR
      // create internal watcher for the computed property.
      // 为每个计算属性创建一个自己的watcher
      //lazy:true用来标识watcher是computedWatcher
      watchers[key] = new Watcher(
        vm,
        getter || noop,//当前计算属性的getter函数
        noop,
        computedWatcherOptions//{lazy:true}
      )
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    //如果不存在同名属性，才定义（有可能原型上、data、props中定义了同名属性）
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm)
      }
    }
  }
}

// target:组件实例，key:计算属性名，userDef:计算属性的值，可能是getter函数或者是一个包含get方法的对象
export function defineComputed (
  target: any,
  key: string,
  userDef: Object | Function
) {
  const shouldCache = !isServerRendering()
  //如果是用户定义的计算属性值是函数
  if (typeof userDef === 'function') {
    //默认创建有缓存的computed getter，也就是执行createComputedGetter
    //服务器端渲染不走缓存
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef)
    sharedPropertyDefinition.set = noop//set设置为空函数
  } else {//定义的是一个对象
    // 如果用户定义了get属性，默认创建有缓存的computed getter，执行createComputedGetter
    // 这里对象格式支持用户设置cache:false,每次都调用createGetterInvoker重新创建computed getter
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop//用户没有配置get，则设置为一个空函数
    sharedPropertyDefinition.set = userDef.set || noop//用户配置了set就使用用户的，否则为一个空函数
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        `Computed property "${key}" was assigned to but it has no setter.`,
        this
      )
    }
  }
  //初始化组件时给组件的原型定义计算属性的描述符getter setter
  //实例最直接通过this[key]可访问原型上的值
  //getter的第一个参数是this是Object.defineProperty传入的（this在正常访问时都是当前组件实例）
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

/**
 * 此函数会在第二次初始化computed属性时触发（computed属性的创建也是有缓存的）
 * @param {计算属性名} key 
 * @return {一个函数，作为计算属性的getter} function
 */
function createComputedGetter (key) {
  //这个返回的函数就是计算属性的getter
  return function computedGetter () {
    //获取当前计算属性名对应的watcher实例（在initComputed中创建并添加的）
    const watcher = this._computedWatchers && this._computedWatchers[key]

    //这里watcher正常都是有值的（SSR没有）
    if (watcher) {
      //watcher初始化时dirty是接收lazy属性的值，所以为true
      //evaluate之后，会把dirty改为false
      //dep.notify中执行所有的当前属性的watcher的update方法中，会把当前dirty设置为true
      if (watcher.dirty) {
        //这里把new Watcher时传入的get函数执行的返回值设置给watcher的value属性（会触发get函数中编写的响应式数据的getter）
        //然后把watcher.dirty设置为false
        watcher.evaluate()
      }
      //Dep.target有值时，可能的情况
      //1.当前计算属性的getter是创建当前计算属性的userWatcher时触发的(用户监听计算属性的变化)，Dep.target指向当前计算属性的userWatcher
      //2.当前计算属性的getter是在其他的计算属性的get函数中被调用触发的（其它计算属性依赖当前计算属性），Dep.target指向其他的计算属性的computedWatcher
      //因此当前computedWatcher的依赖发生改变时，我们需要通知可能存在的userWatcher和其他计算属性更新
      if (Dep.target) {
        //这里的watcher是当前computedWatcher（它可能会添加多个属性为依赖）
        //depend方法就是将自身依赖的属性全部复制给Dep.target(也就是userWathcer或者computedWatcher)，这样当触发对应属性setter时会同志对应watcher执行
        watcher.depend()
      }
      return watcher.value//返回当前计算属性的值（watcher.evaluate中设置的），如果watcher.dirty为false，则返回的是上一次watcher.evaluate的值
    }
  }
}

//fn是用户传入的getter,这个函数的作用是：
//返回一个函数作为计算属性的get,get触发时，调用用户传递的函数，绑定this，并返回值（不走缓存）
function createGetterInvoker(fn) {
  //此函数作为计算属性的getter，会在访问计算属性时调用
  return function computedGetter () {
    //这里的this指向当前组件实例
    //fn就是用户定义的get函数，会传入当前组件实例作为唯一参数
    return fn.call(this, this)
  }
}

function initMethods (vm: Component, methods: Object) {
  const props = vm.$options.props
  for (const key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn(
          `Method "${key}" has type "${typeof methods[key]}" in the component definition. ` +
          `Did you reference the function correctly?`,
          vm
        )
      }
      if (props && hasOwn(props, key)) {
        warn(
          `Method "${key}" has already been defined as a prop.`,
          vm
        )
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          `Method "${key}" conflicts with an existing Vue instance method. ` +
          `Avoid defining component methods that start with _ or $.`
        )
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm)
  }
}

function initWatch (vm: Component, watch: Object) {
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {//可以传递一个数组
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

function createWatcher (
  vm: Component,
  expOrFn: string | Function,
  handler: any,
  options?: Object
) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  //如果是字符串，当做data中的一个属性去获取（一般是在methods中定义的函数）
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}

export function stateMixin (Vue: Class<Component>) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  const dataDef = {}
  dataDef.get = function () { return this._data }
  const propsDef = {}
  propsDef.get = function () { return this._props }
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      )
    }
    propsDef.set = function () {
      warn(`$props is readonly.`, this)
    }
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef)
  Object.defineProperty(Vue.prototype, '$props', propsDef)

  Vue.prototype.$set = set
  Vue.prototype.$delete = del

  Vue.prototype.$watch = function (
    expOrFn: string | Function,
    cb: any,
    options?: Object
  ): Function {
    const vm: Component = this
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {}
    options.user = true//标记为userWatcher
    const watcher = new Watcher(vm, expOrFn, cb, options)
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value)
      } catch (error) {
        handleError(error, vm, `callback for immediate watcher "${watcher.expression}"`)
      }
    }
    return function unwatchFn () {
      watcher.teardown()
    }
  }
}

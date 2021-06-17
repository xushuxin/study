/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { defineComputed, proxy } from '../instance/state'
import { extend, mergeOptions, validateComponentName } from '../util/index'

export function initExtend (Vue: GlobalAPI) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  //闭包
  //包括Vue和其子类，每个构造函数都有一个cid,作为唯一标识
  //作用：可以进行原型继承，并缓存构造函数
  Vue.cid = 0//Vue的cid是0，后面每调用一次extend方法，cid加1
  let cid = 1

  /**
   * Class inheritance
   */
  // 传入一个组件对象（也可不传），返回一个Vue的子类
  Vue.extend = function (extendOptions: Object): Function {
    //this => Vue
    extendOptions = extendOptions || {}//没有传则默认初始化为一个空对象
    const Super = this//Super => Vue或者其子类
    const SuperId = Super.cid//获取父类的cid
    //首次会创建一个对象来缓存所有已创建的类
    //下一次如果传入了同一个组件选项对象，上面就已经有了_Ctor，就不需要再重新继承，直接返回继承后的子类即可
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    //如果已经继承过（创建过这个子类），则直接通过cid获取到缓存的父类
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }
    //如果没有传入extendOptions.name则使用父类的，Vue.options.name默认为undefined
    const name = extendOptions.name || Super.options.name
    //非生产模式校验组件名
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name)
    }

    //创建一个函数作为子类，new 子类时调用其私有的init方法，初始化子类实例
    const Sub = function VueComponent (options) {
      this._init(options)
    }
    //原型重定向，子类的原型的__proto__设置为父类的原型
    //子类原型可以继承父类原型上的方法和属性
    Sub.prototype = Object.create(Super.prototype)//Object.create，创建一个空对象并将其__proto__设置为传入的对象
    Sub.prototype.constructor = Sub//原型重定向导致constructor丢失，需要在新的原型上加上
    Sub.cid = cid++//子类保存cid，cid加1
    //子类的options接收到一个父、子类的options对象合并后的一个新对象，
    //子组件会覆盖父组件的同名选项（没有递归，只比较了第一级）
    //内部有一些自定义的合并策略，比如strats.data
    //返回的options中data会是一个merged
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )
    Sub['super'] = Super//子类通过super属性指向父类

    // For props and computed properties, we define the proxy getters on the Vue instances at extension time, on the extended prototype. This avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps(Sub)
    }
    if (Sub.options.computed) {
      initComputed(Sub)
    }
    
    //子类继承父类的静态方法 extend/mixin/use (子类也需要使用这些)
    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    // create asset registers, so extended classes
    // can have their private assets too.

    // 继承一些静态方法（可以扩展），目前有 component、directive、filter
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type]
    })
    // enable recursive self-lookup
    //给合并后的子类options对象的components添加一个name（组件名）指向子类自身
    if (name) {
      Sub.options.components[name] = Sub
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options//在子类上保留对父类options的引用，在实例化子类实例时，可以检查父类options是否已发生改变
    Sub.extendOptions = extendOptions//在子类上保留对子类自己的options的引用
    Sub.sealedOptions = extend({}, Sub.options)//在子类上保留对合并后的options的拷贝（浅）

    // cache constructor
    cachedCtors[SuperId] = Sub//缓存子类
    return Sub//把子类返回
  }
}

function initProps (Comp) {
  const props = Comp.options.props
  for (const key in props) {
    proxy(Comp.prototype, `_props`, key)
  }
}

function initComputed (Comp) {
  const computed = Comp.options.computed
  for (const key in computed) {
    defineComputed(Comp.prototype, key, computed[key])
  }
}

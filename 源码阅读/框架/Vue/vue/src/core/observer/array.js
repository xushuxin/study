/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

const arrayProto = Array.prototype
//创建一个数组的空实例，他可以调用数组原型上的所有属性和方法
export const arrayMethods = Object.create(arrayProto)

//定义需要重写的数组方法（会改变原数组的方法）
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  //使用Object.defineProperty重写数组实例的7个方法
  def(arrayMethods, method, function mutator (...args) {
    //调用原函数，函数中this指向调用的数组，传递参数
    const result = original.apply(this, args)
    const ob = this.__ob__//获取观察者
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    //如果新增元素，也要进行观察
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify()//通知更新
    return result
  })
})

/* @flow */

import { _Set as Set, isObject } from '../util/index'
import type { SimpleSet } from '../util/index'
import VNode from '../vdom/vnode'

//使用Set来保存依赖的id
const seenObjects = new Set()

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
//val: 我们需要监听的值（一般会是对象或者数组）
export function traverse (val: any) {
  //递归遍历每个属性，触发他们的getter，从而在getter中添加为当前依赖
  _traverse(val, seenObjects)
  seenObjects.clear()//清空set
}

function _traverse (val: any, seen: SimpleSet) {
  let i, keys
  const isA = Array.isArray(val)//是否为数组
  //不是数组，也不是对象，或者对象已被冻结，或者是VNode的一个实例，直接返回
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  //当前对象或者数组已定义成响应式了（保存了dep实例）
  if (val.__ob__) {
    const depId = val.__ob__.dep.id
    //如果已经添加过dep的id则不再添加
    if (seen.has(depId)) {
      return
    }
    //id填加到set中
    seen.add(depId)
  }
  //如果是数组
  if (isA) {
    i = val.length
    //遍历数组，获取数组每一项的值，递归调用，处理数组项
    //val[i]并不会触发数组项的getter，Vue并没有监听数组的索引
    //这里继续递归调用，为了触发数组中的对象的getter
    while (i--) _traverse(val[i], seen)
  } else {//否则是普通对象
    keys = Object.keys(val)
    i = keys.length
    //遍历对象，处理对象的每个属性
     //val[keys[i]]会触发对应属性的getter，从而添加依赖
    while (i--) _traverse(val[keys[i]], seen)
  }
}

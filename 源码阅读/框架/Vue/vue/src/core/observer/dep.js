/* @flow */

import type Watcher from './watcher'
import { remove } from '../util/index'
import config from '../config'

let uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++//每次创建dep对象，id加1，唯一id用于区分是哪个dep
    this.subs = []//初始化一个空的依赖数组
  }

  addSub (sub: Watcher) {
    //向当前属性的依赖数组中添加一个watcher
    this.subs.push(sub)
  }

  removeSub (sub: Watcher) {
    //从数组中删除这个watcher
    remove(this.subs, sub)
  }

  //此方法会在依赖的getter触发时调用，添加watcher为依赖
  depend () {
    //如果有Dep.target(即一个watcher，
    //则调用这个watcher的addDep方法)
    //传递当前实例给watcher，watcher再调用当前实例的addSub方法，添加一个依赖
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id)
    }
    //执行所有watcher的update方法
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null
const targetStack = []//用栈来维护Dep.target的指向，解决有嵌套computed的情况

export function pushTarget (target: ?Watcher) {
  targetStack.push(target)//把当前watcher添加到栈中
  Dep.target = target//Dep的target属性指向当前watcher(用于属性的getter中判断并添加到依赖池)
}

export function popTarget () {
  targetStack.pop()//删除栈中最后一项
  Dep.target = targetStack[targetStack.length - 1]//把Dep.target指针指向前一项，如果栈为空，则为undefined
}

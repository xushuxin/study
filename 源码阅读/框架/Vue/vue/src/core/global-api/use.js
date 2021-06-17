/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  //接收一个函数或者对象
  Vue.use = function (plugin: Function | Object) {
    //this指向Vue
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    //检查插件是否已注册，防止重复注册
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)//获取插件对象之外的，传递的参数
    args.unshift(this)//Vue作为第一个参数
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}

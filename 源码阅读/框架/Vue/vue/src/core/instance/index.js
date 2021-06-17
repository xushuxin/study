import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  //入口 new Vue的时候执行 Vue.prototype._init (目录../init.js)
  this._init(options)
}
//以下是在Vue实例化之前就执行的一些函数，用于为Vue扩展一些额外的功能（建造者模式）
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)//事件流$on/$off/$emit
lifecycleMixin(Vue)//注入生命周期的方法：_update、$forceUpdate、$destroy
renderMixin(Vue)

export default Vue

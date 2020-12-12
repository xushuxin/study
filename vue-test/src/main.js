// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import ElementUI from 'element-ui'
import "normalize.css"; //统一样式
// import 'element-ui/lib/theme-chalk/index.css'; //element-ui样式
import debounce from "lodash.debounce"
import App from './App'
import router from './router'; //引入路由
import VueTouch from 'vue-touch';
// import myAxios from 'js/axios'; //webpack配置了自动引入
process.env.NODE_ENV === 'mock' && require('../mock/mock.js'); //在vue项目中使用mockjs
// import MandMobile from 'mand-mobile'
import globalComponents from '@/components/global/index.js'
// import 'mand-mobile/lib/mand-mobile.css'

//原型上扩展方法，则实例均可使用（this.）
Vue.prototype = Object.assign(Vue.prototype, {
  debounce,
  // myAxios
})
console.log('Vue.prototype', Vue.prototype)
  // Vue.use(MandMobile)
  // Vue.use(ElementUI)
Vue.use(VueTouch, {
  name: 'v-touch'
});
// 注册所有全局组件
Vue.use(globalComponents)

//自定义指令，根据权限列表以及v-permission绑定的值判断是否有权限，无权限元素隐藏
Vue.directive('permission', {
  inserted: function(el, binding, vnode) {
    //这里需要从登录的信息里获取（一般单页应用存在 vuex state 中）
    const permissionList = ["1", "2", "3", "4", "5"]
    const permission = binding.value;
    if (!permission) throw Error('需要传入权限id')
    if (!permissionList.includes(permission)) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
});
/**自定义指令，图片懒加载 */
import imgLazy from '@/directive/imgLazy.js'
Vue.directive('imgLazy', imgLazy)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import "normalize.css/normalize.css"; //统一样式
import debounce from "lodash.debounce"
Vue.prototype.debounce = debounce;
import App from './App'
import router from './router'
import VueTouch from 'vue-touch';
import myAxios from 'js/axios';
process.env.NODE_ENV === 'mock' && require('../mock/mock.js'); //在vue项目中使用mockjs
import mandMobile from 'mand-mobile'
import myTestComponents from '@/components/index.js'
import 'mand-mobile/lib/mand-mobile.css'

Vue.prototype.myAxios = myAxios;
Vue.use(mandMobile)
Vue.use(VueTouch, {
    name: 'v-touch'
  })
  // 注册所有组件
Vue.use(myTestComponents)

//自定义指令，根据权限列表以及v-permission绑定的值判断是否有权限，无权限元素隐藏
Vue.directive('permission', {
    inserted: function(el, binding, vnode) {
      const permissionList = ["1", "2", "3", "4", "5"]
      const permission = binding.value;
      if (!permission) throw Error('需要传入权限id')
      if (!permissionList.includes(permission)) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  })
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
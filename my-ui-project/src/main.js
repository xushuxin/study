import Vue from 'vue'
import App from './App.vue'
import zfUi from './packages/index'
Vue.use(zfUi)//注册所有组件
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')

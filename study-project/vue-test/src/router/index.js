import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const routes = [];
const requireComponent = require.context('../pages', true, /\.vue$/);
console.log(requireComponent.keys());
requireComponent.keys().forEach(fileName => {
  const config = requireComponent(fileName);
  const fileNameFormat = fileName.split('/').pop().replace(/\.\w+$/, '')
  '/' + false ? console.log(1) : console.log(2);
  routes.push({
    path: config.default.name ? (config.default.name === 'index' ? '/' : `/${config.default.name}`) : `/${fileNameFormat}`,
    name: config.default.name,
    component: config.default,
  })
})
console.log(routes)
export default new Router({
  routes
  // routes: [
  //   {
  //     path: '/',
  //     name: 'Index',
  //     component: Index
  //   },
  //   {
  //     path: '/test-vue',
  //     name: 'test-vue',
  //     component: testVue
  //   },
  //   {
  //     path: '/testMathjs',
  //     name: 'testMathjs',
  //     component: testMathjs
  //   },
  //   {
  //     path: '/slide-del',
  //     name: 'slide-del',
  //     component: slideDel
  //   },
  //   {
  //     path: '/use-slide-del',
  //     name: 'use-slide-del',
  //     component: useSlideDel
  //   },
  //   {
  //     path: '/test-mand-mobile',
  //     name: 'test-mand-mobile',
  //     component: testMandMobile
  //   },
  //   {
  //     path: '/vue2-principle',
  //     name: 'vue2-principle',
  //     component: vue2Principle
  //   },
  //   {
  //     path: '/lodash-debounce',
  //     name: 'lodash-debounce',
  //     component: lodashDebounce
  //   }
  // ]
})
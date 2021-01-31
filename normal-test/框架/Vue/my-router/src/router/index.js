import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from '../self-router/index'//自己的router
import Home from '../views/Home.vue'
console.log(VueRouter)

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Test.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

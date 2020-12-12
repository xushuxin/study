<template>
  <div class="">
    <el-button @click="show=!show">切换组件</el-button>
    <sync-component-1 v-if = 'show'></sync-component-1>
    <sync-component-2 v-else></sync-component-2>
  </div>
</template>

<script type="text/javascript">
/* 
  如果正常写组件import XXX from 'path'，是静态引入，会在页面生成时就加载组件的内容
  （如果不使用路由懒加载，则所有页面静态引入的组件都会在首屏地时候加载）

  异步组件加载（动态加载）的好处：减少首次加载内容，加快页面加载速度
  原理：
  1.webpack的import(),引入资源，返回一个Promise实例（引入成功，则为成功态，不成功为失败态）
  2.vue的components配置项允许接收一个返回值为Promise实例的函数，
  并且会在页面生成组件的时候调用，获取到Promise实例的值（也就是组件对象），
  进行组件初始化
  
  每个异步加载的组件，会在打包时，单独抽离出一个js文件
*/
export default {
  data() {
    return {
      show:true
    } 
  },
  components: {
    /* 异步组件的加载方式 */
    'sync-component-1':()=>import("@/components/scope/sync-component-1"),
    'sync-component-2':()=>import("@/components/scope/sync-component-2")
  },
  created(){

  },
  mounted(){

  },
  updated(){

  },
  methods:{

  }
}
</script>

<style lang="stylus" scoped>
</style>
<template>
  <transition
    appear
    appear-class="custom-appear-class"
    appear-to-class="custom-appear-to-class"
    appear-active-class="custom-appear-active-class"
  >
    <div>hello</div>
  </transition>
</template>

<script type="text/javascript">
export default {
  data() {
    return {

    }
  },
  components: {

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
// 定义元素进入时的持续时间和动画函数
.custom-appear-active-class {
  transition: all 0.8s ease;
}
//离开过渡被触发之后下一帧生效，元素移除的过渡结束后移除
//定义离开过渡的结束状态
//添加类名会产生过渡效果：opacity:1=>0 translateX(0=>10px)
.custom-appear-class{
  transform: translateX(200px);
}
.custom-appear-to-class{
  transform: translateX(100px);
  // animation :custAnimation;
}
</style>
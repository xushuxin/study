<template>
<div class="">
  <transition name="my-transition">
    <div v-show="show">hello</div>
  </transition>
  <button @click="show=!show">toggle</button>
</div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  }
}
</script>

<style lang="scss" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */

// 定义元素进入时的持续时间和动画函数
.my-transition-enter-active {
  transition: all 0.3s ease;
}

//定义元素离开时的持续时间和动画函数
.my-transition-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

//定义组件的初始状态，元素插入时会移除该类名，产生过渡效果
//移除该类名后会产生过渡效果：opacity:0=>1 translateX(10=>0)
.my-transition-enter {
  transform: translateX(10px); //向右移10px
  opacity: 0; //初始完全透明
}

//离开过渡被触发之后下一帧生效，元素移除的过渡结束后移除
//定义离开过渡的结束状态
//添加类名会产生过渡效果：opacity:1=>0 translateX(0=>10px)
.my-transition-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>

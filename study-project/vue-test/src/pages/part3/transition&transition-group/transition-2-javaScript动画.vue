
<!--
Velocity 和 jQuery.animate 的工作方式类似，也是用来实现 JavaScript 动画的一个很棒的选择
-->

<template>
  <div id="example-4">
    <button @click="show = !show">
      Toggle
    </button>
    <transition 
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave" 
    v-bind:css="false"><!--不使用css动画，排除css干扰-->
      <p v-if="show">
        Demo
      </p>
    </transition>
  </div>
</template>

<script>
export default{
  data(){
    return {
      show: false
    }
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.transformOrigin = 'left'
    },
    enter: function (el, done) {
      Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
      Velocity(el, { fontSize: '1em' }, { complete: done })
    },
    leave: function (el, done) {
      Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
      Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
      Velocity(el, {
        rotateZ: '45deg',
        translateY: '30px',
        translateX: '30px',
        opacity: 0
      }, { complete: done })
    }
  } 
}
</script>

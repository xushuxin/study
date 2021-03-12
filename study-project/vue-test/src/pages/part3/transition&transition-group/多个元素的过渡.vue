<template>
<div>
  <transition name="my-transition" mode="out-in">
    <button class="btn" :key="isEditing?'edit':'save'" >
      {{buttonText}}
    </button>
  </transition>

  <div>
    <button style="margin-top:30px;" @click="isEditing = !isEditing">
      切换按钮out-in
    </button>
  </div>

  <transition name="my-transition" mode="in-out">
    <button class="btn2" :key="isEditing2?'edit':'save'" >
      {{buttonText2}}
    </button>
  </transition>

  <div>
    <button style="margin-top:40px;" @click="isEditing2 = !isEditing2">
      切换按钮in-out
    </button>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      isEditing:true,
      isEditing2:true,
    }
  },
  computed:{
    buttonText(){
      return this.isEditing?'编辑':'保存'
    },
    buttonText2(){
      return this.isEditing2?'编辑':'保存'
    },
  },
  components: {

  },
  created() {

  },
  mounted() {

  },
  updated() {

  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */

// 定义元素进入时的持续时间和动画函数
.my-transition-enter-active {
  transition: all 0.3s ease;
}

//定义元素离开时的持续时间和动画函数
.my-transition-leave-active {
  transition: all 0.3s ease;
}

//定义组件的初始状态，元素插入时会移除该类名，产生过渡效果
//移除该类名后会产生过渡效果：opacity:0=>1 translateX(10=>0)
.my-transition-enter {
  transform: translateX(50px); //向右移10px
  opacity: 0; //初始完全透明
}

//离开过渡被触发之后下一帧生效，元素移除的过渡结束后移除
//定义离开过渡的结束状态
//添加类名会产生过渡效果：opacity:1=>0 translateX(0=>10px)
.my-transition-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}
.btn,.btn2{
  position:absolute;
  left:100px;
}
.btn2{
  top:110px;
}
</style>

/**组件内外数据双向绑定实现弹框显示隐藏**/
<template>
  <div class="details">
    <myComponent :show.sync='valueChild' style="padding: 30px 20px 30px 5px;border:1px solid #ddd;margin-bottom: 10px;">
    </myComponent>
    <button @click="changeValue">toggle</button>
  </div>
</template>
<script>
  import Vue from 'vue'
  Vue.component('myComponent', {
    template: `<div v-show="show">
                    <p>默认初始值是{{show}}，所以是显示的</p>
                    <button @click.stop="closeDiv">关闭</button>
                    <button @click.stop="getInnerValue">getInnerValue</button>
                 </div>`,
    props: ['show'],
    methods: {
      closeDiv() {
        this.$emit('update:show', false); //触发 input 事件，并传入新值
      },
      getInnerValue(){
        alert(this.show)
      }
    }
  })
  export default {
    data() {
      return {
        valueChild: true,
      }
    },
    methods: {
      changeValue() {
        this.valueChild = !this.valueChild
      }
    },
    mounted() {
      console.log(this.$options)
    },
  }
</script>
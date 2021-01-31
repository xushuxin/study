<template>
  <div>
    <div>textarea随内容可变高度</div>
    <textarea ref="textarea" :style="textareaStyle" v-model="value"></textarea>
  </div>
</template>

<script>
/**
 * 步骤：
 * 1.mounted时调用resizeTextarea方法
 * 2.监听值的变化，值改变时调用resizeTextarea方法
 * 3.resizeTextarea中调用引入的calcTextareaHeight方法（主要原理：生成一个隐藏的textarea，并设置其高度为0(必须，只有这样scrollHeight才会一直存在)，其他影响字体和内容的样式设置和页面上textarea的一致，把页面显示的textarea高度实时设置为隐藏的textarea的scrollHeight）
 */
import calcTextareaHeight from 'js/calcTextareaHeight.js';
export default {
  name:'variable-textarea',
  data(){
    return {
      textareaCalcStyle:'',
      value:''
    }
  },
  watch:{
    value:{
      handler(newVal,oldVal){
        this.$nextTick(this.resizeTextarea);
      }
    }
  },
  computed:{
    textareaStyle:{
      get:function(){
        return this.textareaCalcStyle
      }
    }
  },
  mounted(){
    this.resizeTextarea();
  },
  methods:{
    resizeTextarea(){
      this.textareaCalcStyle=calcTextareaHeight(this.$refs.textarea)
      console.log(this.textareaCalcStyle)
    }
  }
}
</script>

<style>

</style>
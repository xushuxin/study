<template>
  <input type="text" v-bind:value="value" v-on:input="$emit('input',$event.target.value)">
</template>

<script>
export default {
  props:{
    value:{
      type:String,//限制传入的数据类型
      required:true,//必传
      default:'',//默认值
      validator:function(value){//自定义校验函数(控制台报错)
        return ['success','warning','danger'].includes(value)
      }
    }
  }

}
</script>

<style>

</style>
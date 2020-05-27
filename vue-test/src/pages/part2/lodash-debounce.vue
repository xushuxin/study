<template>
  <div>
    <div>测试lodash.debounce防止输入框输入时重复调用事件</div>
    <div>
      <input @input="doSth2" type="text">
    </div>
  </div>

</template>

<script>
import debounce from "lodash.debounce"
export default {
  name:'lodash-debounce',
  methods:{
    doSth:debounce(function(){
      console.log(1)
    },1000, {
      'leading': true,//首次点击就触发事件，后续点击忽略(一般用于防重复点击)
      'trailing': false
    }),
    doSth2:debounce(function(){
      this.myAxios.get('random?auth=null').then(res=>{
        console.log(res)
      })
    },1000, {
      'leading': false,
      'trailing': true//停止触发事件1s后触发（用于输入内容后自动查询数据）
    }),
  }
}
</script>

<style>

</style>

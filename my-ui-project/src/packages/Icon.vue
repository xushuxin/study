<template>
  <svg class="zf-icon" aria-hidden="true">
      <use :xlink:href="`#icon-${icon}`"></use>
  </svg>
</template>
<script>
  import '../styles/iconfont' 
  /**图标名：styles/icon-demo_index.html */
  export default{
    name:'zf-icon',
    props:{
      icon:{
        type:String,
        required:true
      }
    }
  }
</script>
<style lang="scss">
  .zf-icon{
    width:25px;
    height:25px;
    vertical-align:middle;
  }
</style>
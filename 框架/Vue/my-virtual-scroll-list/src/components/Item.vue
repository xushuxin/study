<template>
  <div class="item">
    {{item.id}} ---- {{item.value}}
  </div>
</template> 
<script>
  export default{
    props:{
      item:Object
    },
    mounted(){
    }
  }
</script> 
<style lang="scss">
.item{
  // height:40px;
  // line-height:40px;
  padding:20px 0;
  border:1px solid #faa;
  text-align:center;
  margin-bottom:20px;
}
</style>
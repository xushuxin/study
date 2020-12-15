<template>
  <div class="">
    <input type="text" v-model="val1">
    <input type="text" v-model="val2">
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      val2:'',
      val1:'',
    }
  },
  components: {

  },
  watch:{
    val:function(newVal,oldVal){
      if(newVal!==oldVal){
        this.$emit('input',newVal)
      }
    }
  },
  computed:{
    val(){
      return this.val1 + ' ' + this.val2;
    }
  },
  created(){

  },
  mounted(){

  },
  updated(){

  },
  methods:{
    doInput(){
      
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
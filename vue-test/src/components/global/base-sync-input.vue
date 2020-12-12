/****/
<template>
  <div class="">
    <input type="text" v-bind:value="inputValue" v-on:input="$emit('update:inputValue',$event.target.value)">
    <button v-on:click="changeInnerValue">changeInnerValue</button>
    <button v-on:click="getInnerValue">getInnerValue</button>
  </div>
</template>

<script type="text/javascript">
export default {
  props:{
    inputValue:String
  },
  data() {
    return {

    }
  },
  components: {

  },
  created(){

  },
  mounted(){

  },
  updated(){

  },
  methods:{
    getInnerValue(){
      alert(this.inputValue)
    },
    changeInnerValue(){
      this.$emit('update:inputValue','嘿嘿嘿')
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
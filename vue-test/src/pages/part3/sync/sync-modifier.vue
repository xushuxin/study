/**.sync修饰符实现组件数据双向绑定；类似于v-model**/
<template>
  <div class="">
    <base-sync-input v-bind:inputValue.sync="bar"></base-sync-input>
    <button v-on:click="getValue">getValue</button>
    <button v-on:click="changeValue">changeValue</button>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      bar:''
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
    getValue(){
      alert(this.bar)
    },
    changeValue(){
      this.bar="哈哈哈"
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
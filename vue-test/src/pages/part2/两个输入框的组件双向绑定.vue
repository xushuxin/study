/**两个输入框的组件双向绑定**/
<template>
  <div class="">
    <two-input v-model="inputValue"></two-input>
    <div>{{inputValue}}</div>
  </div>
</template>

<script type="text/javascript">

export default {
  data() {
    return {
      inputValue:''
    }
  },
  components: {
    twoInput:()=>import('components/scope/two-input')
  },
  created(){

  },
  mounted(){

  },
  updated(){

  },
  methods:{

  }
}
</script>

<style lang="stylus" scoped>
</style>
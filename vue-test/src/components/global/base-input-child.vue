/**孙子组件,获取祖父组件的传递的参数和值**/
<template>
  <div class="">
    祖父组件的传值（不包括父组件已声明的props属性）
    {{$attrs}}
    <div>
      <input type="text" placeholder="请输入修改的名字" v-model="inputValue">
      <button @click="$emit('changeShowName',inputValue)">changeShowName</button>
    </div>
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
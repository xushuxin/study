// 自定义事件
<template>
  <div>
    <button @click="handleClick">触发</button>
    <!-- <custom-input v-model="searchText"></custom-input> -->
    <!-- 在自定义组件上可以用$event获取自定义事件的传值 -->
    <custom-input
      v-bind:value="searchText"
      v-on:input="searchText=$event"
    ></custom-input>
    <button @click="getInputValue">获取输入框的值</button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      searchText:''
    }
  },
  created(){
    
  },
  mounted(){
    this.$on('myClick',function(){
      alert(`11`)
    })
  },
  updated(){},
  methods:{
    handleClick(){
      this.$emit('myClick')
    },
    getInputValue(){
      alert(this.searchText)
    }
  }
}
</script>

<style>

</style>
<template>
  <div id="app">
     <!-- variable:true表示列表项高度不固定 -->
    <VirtualList :size="84" :remain="10" :items="items" :variable="true">
      <!-- <Item slot-scope="{item}" :item="item"></Item> -->
      <template  v-slot:default="{item}">
         <Item :item="item"></Item>
      </template>
      </VirtualList> 
      
  </div>
</template>

<script>
import VirtualList from './components/VirtualList.vue'
import Item from './components/Item.vue'
import Mock from 'mockjs'
let items = Array.apply(null,{length:10000}).map((item,index)=>({id:index,value:Mock.Random.sentence(5,50)}))
export default {
  name: 'App',
  components: {
    VirtualList,
    Item
  },
  data(){
    return {
      items
    }
  }
}
</script>

<style lang="scss">
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}
</style>

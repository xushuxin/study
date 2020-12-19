/**测试diff对比**/
<template>
  <div class="">
    <ul>
      <li :style="{background:item.checked?'green':'#faa'}" v-for="(item,index) in list" :key="item.id">
        <input type="checkbox" @change="doChange(index)" name="" id="">{{item.num}} <button @click="list.splice(index,1)">del</button>  
      </li>
      <div>{{list}}</div>
    </ul>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      list:new Array(8).fill('').map((item,index)=>({id:Math.random(),num:Math.floor(Math.random()*index*10)}))
    }
  },
  components: {

  },
  created(){

  },
  mounted(){
    
    console.log(this.list)
  },
  updated(){

  },
  methods:{
    doChange(index){
      console.log('change')
      this.list[index].checked=!this.list[index].checked;
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
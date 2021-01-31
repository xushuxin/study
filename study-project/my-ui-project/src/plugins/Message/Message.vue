<template>
  <div class="message">
    <div v-for="(item,index) in messages" :key="index">
      {{item.message}}
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      messages:[],
      id:0
    }
  },
  created(){

  },
  mounted(){

  },
  updated(){

  },
  methods:{
    add(options){//增加弹出消息
      let id  = this.id++;//id+1
      let layer ={...options,id};//当前对象的配置信息
      this.messages.push(layer);
      //添加组件后，duration秒后移除
      layer.timer = setTimeout(()=>{
        this.remove(layer);
      },options.duration);
    },
    remove(layer){//移除一条消息
      clearTimeout(layer.timer);
      this.messages = this.messages.filter(item=>item.id!==layer.id);
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
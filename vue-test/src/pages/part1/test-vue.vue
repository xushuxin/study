<template>
<div>
  <h1 style="text-align:center">测试vue语法</h1>
  <h3>v-html绑定html标签</h3>
  <div v-html="htmlTag">
    
  </div>
  <h3>v-pre跳过该元素的内容的编译过程</h3>
  <div v-pre>
    {{"我是一段文字"}}
  </div>
  <h3>测试computed</h3>
  <div>
    这是计算属性的值{{fullName}}
    <button @click="changeComputed">修改fullName</button>
  </div>
</div>
</template>

<script>
export default {
  name:'test-vue',
  components:{
  },
  data(){
    return {
      htmlTag:'<span>我是一段文字</span>',
      firstName:'xu',
      lastName:'shuxin',
    }
  },
  computed:{
    fullName:{
      get:function(){
        console.log('获取fullName的值')
        return this.firstName+' '+this.lastName
      },
      set:function(newVal){
        console.log(newVal)
        console.log('设置新的fullName必须设置set')
        console.log('并且需要在set中修改computed值依赖的属性，如first Name和lastName')
        let names=newVal.split(' ');
        this.firstName=names[0];
        this.lastName=names[1];
      }
    } ,
  },
  methods:{
    changeComputed(){
      //直接修改computed的值，修改的实际规则在set中定义
      this.fullName="xie daxian";
    }
  },
  mounted(){
  }
}

</script>

<style>

</style>
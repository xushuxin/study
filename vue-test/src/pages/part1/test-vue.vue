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
  <div class="box">
    <h3>测试Vue数据不更新问题</h3>
    <div>{{obj}}{{arr}}</div>
    <button @click="changeB">修改对象的b属性的值</button>
  </div>
  <div class="box">
    <h3>测试Vue异步组件</h3>
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
      inputValue:'',
      show:true,
      obj:{a:'123'},
      arr:[1,2]
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
        console.log('并且需要在set中修改computed值依赖的属性，如firstName和lastName')
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
    },
    getInputValue(){
      console.log('输入框内容：',this.inputValue);
      console.log('输入框内容：',document.getElementById('input1').value);
    },
    changeB(){
      // this.obj.b = '456';//b没有被vue监听，所以修改后无法触发视图更新
      // this.obj = {...this.obj};
      // this.$set(this.obj,'b','456');
      // this.$forceUpdate();
      this.$set(this.arr,1,1000);
      // this.arr.splice(1,1,1000)//修改索引为2的那项
    }
  },
  mounted(){
  }
}

</script>

<style lang="scss">
//css原生变量
:root{
  --color-red: #ff538a;
}
.box{
  border: 1px solid var(--color-red);
  margin-top:10px;
  padding:10px;
}
</style>
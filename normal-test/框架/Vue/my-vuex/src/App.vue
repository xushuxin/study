<template>
  <div id="app">
    <h1>{{$store.state.count}}</h1>
    <div>
      <button @click="doAdd(5)">同步基本值提交增加</button>
      <button @click="doMinus({amount:5})">同步对象格式提交减少</button>
      <button @click="doMultiply">同步对象格式2提交乘法</button>
    </div>
    <div style="margin-top:20px;">
       <button @click="doAsyncAdd">异步增加</button>
    </div>
    <div class="test-flex">
      <div v-for="(item,index) in [1,2,3,4]" :key="item" :class="`flex-item-${index}`">item</div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {mapMutations} from 'vuex';//使用mapMutations将组件中的methods映射为store.commit
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted(){
  },
  methods:{
    ...mapMutations(
      //将this.doAdd(5)映射为this.$store.commit('add',5)
      //将this.doMinus({amount:5}})映射为this.$store.commit('add',{amount:5})
      {doAdd:'add',doMinus:'minus'},
      // ['add','minus']//如果method name和mutation相同，则可以直接使用数组
    ),
    // doAdd(){
    //   this.$store.commit('add',5);
    // },
    // doMinus(){
    //   this.$store.commit('minus',{amount:5});
    // },
    doMultiply(){
      this.$store.commit({
        type:'multiply',
        amount:5
      });
    },
    doAsyncAdd(){
      this.$store.dispatch({
        type:'asyncAdd',
        amount:5
      })
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.test-flex{
  display: flex;
  justify-content: space-between;
  flex-wrap:wrap;
  @each $class,$color,$border in (flex-item-0,#f00,#000),
  (flex-item-1,#ff0),
  (flex-item-2,#00f),
  (flex-item-3,#faa),
  (flex-item-4,#bfb),
  (flex-item-5,#ded)
  {
    .#{$class}{
      background:#{$color};
      border-color:#{$border};
    }
  } 
  &:after{
    content:'';
    width:100px;
  }
  >div{
    height: 100px;
    width:100px;
  }
}
</style>

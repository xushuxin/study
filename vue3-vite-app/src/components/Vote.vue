<template>
  <div>
    <h3>{{msg}}</h3>
    <div>
      <p>支持人数：{{supNum}}</p>
      <p>反对人数：{{oppNum}}</p>
      <p>支持率：{{ratio}}</p>
      <button @click="change(0)">支持</button>
      <button @click="change(1)">反对</button>
    </div>
  </div>
</template>

<script>
import {watch,watchEffect,ref,reactive,toRefs,computed}  from "vue";
export default {
  props:{
    msg:String
  },
  //初始化props和beforeCreate之间
  //props：基于Proxy代理的响应式数据
  //如解构props，则不存在响应式
  setup(props){
    
    // let supNum = ref(0),oppNum=ref(0);
    // let state = ref({
    //   supNum:0,
    //   oppNum:0
    // })
    let state = reactive({
      supNum:0,
      oppNum:0
    });
    function change(lx){
      // console.log({...state})
      // console.log(supNum);
      // console.log(oppNum);
      // 需要定义响应式数据，否则默认不会自动更新DOm
      // lx == 0 ?supNum.value++ :oppNum.value++;
      // lx == 0 ?state.value.supNum++ :state.value.oppNum++;
      lx == 0 ?state.supNum++ :state.oppNum++;
    }
    // let ratio = computed(()=>{
    //   let total =state.supNum + state.oppNum;
    //   return total===0?"--":(state.supNum/total*100).toFixed(2)+'%';
    // })
 /*    let ratio = computed({
      get(){
        let total =state.supNum + state.oppNum;
        return total===0?"--":(state.supNum/total*100).toFixed(2)+'%';
      },
      set(val){
        console.log(val) 
        return val;
      }
    }); */
    // ratio.value = 100;
    // console.log(ratio)
    // state.supNum = 99;
    let ratio = ref('--')
    watch(state.supNum,(now,pre)=>{
      console.log(now,pre)
    })

    //返回的对象可以在模板中使用属性（类似于data）
    return {
      // supNum,
      // oppNum,
      ...toRefs(state),
      change,
      ratio
    }
  }
}
</script>

<style>

</style>
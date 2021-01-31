//渲染Message组件并添加到body，并且调用核心方法
import Vue from 'vue';
import Message from './Message.vue';
console.log('Message----',Message)
let instance;//通过单例模式，解决多次创建实例问题
let getInstance = ()=>{
  if(instance) return instance;//如果已存在实例，直接返回该实例即可
  let vm = new Vue({
    render:h=>h(Message)//当前Vue实例仅渲染一个Message组件
  }).$mount();//组件对象，生成到内存中
  console.log('vm----',vm)
  document.body.appendChild(vm.$el);
  //获取到Message组件，然后再拿到方法
  let message = vm.$children[0];//当前实例只有一个Message组件
  //在这里向外暴露一些的方法（单例模式）
  return instance = {
    add:(options)=>{
      message.add(options)//调用组件的add的方法
    }
  }
}
export default{
  info(options){
    //调用Message组件的核心方法add
    getInstance().add(options);
  },
  //支持通过Vue.use注册插件，通过this.$message.info直接调用弹框的方法，需要添加install方法
  install(Vue){
    //this指向当前对象
    Vue.prototype.$message = this;
  }
}
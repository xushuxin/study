// var arr = [6,3,1,7,5,8,9,2,4],arr2=[];
// let i =0;
// for(;i<arr.length;i++){
//   arr2.push(arr.shift());
//   if (arr.length) {
//     arr.push(arr.shift());
//   }
//   i--;
// }
// console.log(arr2)


let code = `<template>
<div class="">

</div>
</template>

<script type="text/javascript">
export default {
data() {
  return {

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
  body{
    height:100%;
  }
</style>`;
//获取.vue文件中，template、script、style标签的内容
function getSource(type,code){
  //可以使用[^]表示匹配任意字符，包括换行回车换页等
  const reg = new RegExp(`<${type}[^>]*>([^]*)</${type}>`);
  let content = code.match(reg)[1];
  return content;
  
}
//处理script标签的内容，转为组件对象
let script = getSource('script',code);
script = script.replace('export default','return');
let componentOptions={};
if(script){
  //把返回值放到一个Function函数中，执行后返回包含组件选项的对象
  component = new Function(script)();
  console.log(component)
}
//处理template，创建一个Vue的子类实例，并将根元素添加到页面
if(template){
  //子组件中可以通过，this.$options._base获取Vue构造函数
  //通过Vue.extend创建一个Vue的子类
  //最后new 子类创建一个子组件实例
  let instance = new (this.$options._base.extend(component))
  //子组件实例$mount方法
  this.$refs.showBox.appendChild(instance.$mount().$el);
}
//处理style标签的内容，创建style标签添加到页面
if(style){
  let element = document.createElement('style');
  element.setAttribute('type','text/css');
  element.innerText = style;
  document.head.appendChild(element);
}



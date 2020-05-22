//这里是不考虑new关键字的情况（最简便的）
/**写一个函数，实现Function.prototype.bind的功能。**/
//es6
Function.prototype.myBind=function(ctx,...args){
  return (...innerArgs)=>this.call(ctx,...args,...innerArgs);
}
//es5写法
// Function.prototype.myBind=function(ctx){
//   let _this=this;
//   let args=Array.prototype.slice.call(arguments,1);
//   return function(){
//     let innerArgs=Array.prototype.slice.call(arguments);
//     _this.apply(ctx,args.concat(innerArgs));
//   }
// }
//test
var a={
  name:'name of a'
};
function test(...msg){
  console.log(this.name);
  console.log(msg)
}

var t=test.myBind(a,'hello');
t('world');




/**实现简易的myCall，
 * 思路：把调用myCall的函数绑定给传入的对象的一个属性（确保独一无二并且不影响原对象属性）再调用，这样调用myCall的函数中this就指向了传入的对象
 * */
Function.prototype.myCall=function(ctx,...args){
  if(!(ctx instanceof Object)) {ctx=globalThis;}
  let symbol=Symbol();//es6,如果是es5可以用时间戳或者随机数的方式创建一个，Object.hasOwnProperty(key)检测是否有这个值，如果有再重新生成
  //this指向调用myCall的函数
  ctx[symbol]=this;
  let res = ctx[symbol](...args);
  delete ctx[symbol];//删除这个属性
  return res;//调用myCall的函数如果有返回值，需要返回
}
var a={name:'name of a'}

function test(...msg){
  console.log(msg)
  return 1
}
console.log(test.myCall(a,'哈哈哈','笑死我'))
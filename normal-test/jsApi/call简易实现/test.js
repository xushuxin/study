Function.prototype.myCall=function(ctx,...args){
  //对象，数组，函数都是Object的实例(因为函数和数组的原型对象的的原型对象是对象的原型对象)
  if(!(ctx instanceof Object)) {ctx=globalThis;}
  console.log(...args)
  let symbol=Symbol();
  ctx[symbol]=this;
  let fnReturn=args.length>0?ctx[symbol](...args):ctx[symbol]();
  delete ctx[symbol];
  return fnReturn;
}
//test
var a={
  name1:'name of a'
}
function b(){

}
var c=[1,2,3]
b.name1="name of b";
c.name1="name of c";
function test(...msg){
  console.log(this.name1)
  console.log(msg)
}
test.myCall(a)
// test.myCall(b,2)
// test.myCall(c,3)
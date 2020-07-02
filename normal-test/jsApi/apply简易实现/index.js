Function.prototype.myApply=function(ctx,argList){
  var symbol=Symbol();
  ctx[symbol]=this;
  let res=ctx[symbol](...argList);
  delete ctx[symbol];
  return res;  
}
var a={name:'name of a'};
function test(...msg){
  console.log(this.name)
  console.log(...msg)
}
test.myApply(a,[1,2,3]);
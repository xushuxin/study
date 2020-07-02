Function.prototype.myBind=function(ctx,...args){
  var _this=this;
  if(typeof _this !='function'){
    throw Error('必须使用函数调用myBind');
  }
  let fn= function(...innerArgs){
    if(this instanceof fn){
      ctx=this;
    }
    _this.call(ctx,...args,...innerArgs);
  }
  return fn;
}
var a={
  name:'name of a'
};
function test(...msg){
  console.log(this.name)
  console.log(...msg);
}
/**创建继承自Function.prototype的对象
 * 一般不使用Object.setPrototypeOf()，因为比较慢，会影响性能
 */
// var test=Object.create(Function.prototype);
// console.log(test.__proto__);
var t=test.myBind(a,'hello');
t('world');
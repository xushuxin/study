//这里是不考虑new关键字的情况（最简便的）
/**写一个函数，实现Function.prototype.bind的功能。**/
//es6
Function.prototype.bind = function(ctx, ...args) {
  return (...innerArgs) => this.call(ctx, ...args, ...innerArgs);
}

//es5写法
// Function.prototype.myBind=function(ctx){
//   var outArgs=[].slice.call(arguments,1);//外层参数(除去第一个this指向的对象)
//   let _this=this;
//   return function(){
//     var innerArgs=[].slice.call(arguments);//内层参数
//     _this.apply(ctx,outArgs.concat(innerArgs))
//   }
// }
//test
var a = {
  name: 'name of a'
};

function test(...msg) {
  console.log(this.name);
  console.log(msg)
}

var t = test.bind(a, 'hello');
t('world');
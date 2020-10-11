/**
 * 重写apply，和call的唯一区别是传参方式不同
 *  */
Function.prototype.apply = function(context, argList) {
  //优化1:如果传入的第一个参数为undefined/null，context设置为window（非严格模式）
  if (context == null) context = window;
  //优化2:如果不是引用数据类型，转为引用数据类型
  if (!/^(object|function)$/.test(typeof context)) context = Object(context);
  let key = Symbol('KEY'); //es6,如果是es5可以用时间戳或者随机数的方式创建一个，key in object检测是否有这个值，如果有再重新生成
  context[key] = this; //this:调用call的函数
  let res = context[key](...argList);
  delete context[key]; //删除这个属性
  return res; //调用call的函数如果有返回值，需要返回
}
var a = { name: 'name of a' };

function test(...msg) {
  console.log(this)
  console.log(...msg)
}
test.apply(a, [1, 2, 3]);
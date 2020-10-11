/**重写call
 * 思路：把调用call的函数绑定给传入的对象的一个属性（确保独一无二并且不影响原对象属性）再调用，这样调用myCall的函数中this就指向了传入的对象
 * */
Function.prototype.call = function(context, ...args) {
  //优化1:如果传入的第一个参数为undefined/null，context设置为window（非严格模式）
  if (context == null) context = window;
  //优化2:如果不是引用数据类型，转为引用数据类型
  if (!/^(object|function)$/.test(typeof context)) context = Object(context);
  let key = Symbol('KEY'); //es6,如果是es5可以用时间戳或者随机数的方式创建一个，key in object检测是否有这个值，如果有再重新生成
  //this:调用call的函数
  context[key] = this;
  let res = context[key](...args);
  delete context[key]; //删除这个属性
  return res; //调用call的函数如果有返回值，需要返回
}
var a = { name: 'name of a' }

function test(...msg) {
  console.log(this)
  console.log(msg)
  return 1
}
console.log(test.call(Symbol('A'), '哈哈哈', '笑死我'))
console.log(test.call(a, '哈哈哈', '笑死我'))
console.log(test.call(1, '哈哈哈', '笑死我'))
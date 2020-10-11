// /**写一个函数，实现Function.prototype.bind的功能。 */
//es6写法
Function.prototype.myBind = function(ctx, ...args) { //...args是剩余参数的用法，将剩余的参数转为数组，args可以换成任意变量名                                                                                                                                            
  //不确定参数的数量，所以用剩余参数的方式传递参数
  let _this = this; //这里的this始终指向调用myBind的函数实例
  if (typeof _this != 'function') {
    throw Error('必须使用函数调用myBind方法')
  }
  let fn = function(...innerArgs) {
    //如果this指向的是当前函数构造出来的实例，代表是new操作符创建的对象;call指向当前作用域的this
    //直接调用时this指向global或者window
    if (this instanceof fn) {
      ctx = this
    }
    _this.call(ctx, ...args, ...innerArgs);
  }
  return fn;
};
//es5写法
// Function.prototype.myBind=function(ctx){
//   var outArgs=Array.prototype.slice.call(arguments,1);//外层参数(除去第一个this指向的对象)
//   let _this=this;
//   return function(){
//     var innerArgs=Array.prototype.slice.call(arguments);//内层参数
//     _this.apply(ctx,outArgs.concat(innerArgs))
//   }
// }
/**
 * test(测试传参及this指向是否可以绑定)
 * */
const a = {
  name: "name of a"
};

function test(...msg) {
  console.log(this.name);
  console.log(...msg);
}

var t = test.myBind(a, "hello");
t("world")
  /**
   * test(测试new操作符调用绑定后的函数中this指向，应指向new创建的对象)**/
  // const b = {
  //   name: "name of b"
  // };
  // function test2(name) {
  //   this.name=name;
  //   console.log(this.name)
  //   console.log(this);
  // }

// var t2 = test2.myBind(b);
// new t2("xiaoming");//xiaoming而不是name of b
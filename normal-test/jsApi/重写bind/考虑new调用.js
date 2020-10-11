/**
 * 写一个函数，实现Function.prototype.bind的功能。
 * new执行调用bind返回的函数，this仍然要指向该实例
 */
Function.prototype.bind = function(ctx, ...outerArgs) { //...args是剩余参数的用法，将剩余的参数转为数组，args可以换成任意变量名                                                                                                                                            
  //不确定参数的数量，所以用剩余参数的方式传递参数
  let _this = this; //这里的this始终指向调用myBind的函数实例
  let fn = function(...innerArgs) { //不可以使用箭头函数，因为箭头函数没有prototype不能new
    //new执行时，构造函数内this指向的是当前函数构造出来的实例
    if (this instanceof fn) {
      ctx = this
    }
    _this.call(ctx, ...outerArgs, ...innerArgs);
  }
  return fn;
};

/**
 * test(测试传参及this指向是否可以绑定)
 * */
const a = {
  name: "name of a"
};

function test(...msg) {
  console.log(this);
  console.log(...msg);
}

var t = test.myBind(a, "hello");
t("world")

/**
 * test(测试new操作符调用绑定后的函数中this指向，应指向new创建的对象)**/
const b = {
  name: "name of b"
};

function test2(name) {
  console.log(this);
}

var t2 = test2.bind(b);
new t2("xiaoming"); //xiaoming而不是name of b
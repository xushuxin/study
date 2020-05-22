/** 什么叫高阶函数：如果一个函数的参数是一个函数（回调函数）或者一个函数返回一个函数（函数柯理化）*/
/**写代码时我们希望不要破坏原有逻辑，而增加一些功能 */
/**对函数进行包装（装饰）切片编程（我们可以把核心抽离出来）包装上自己的内容  切片（AOP）*/
const say = (...args) => {
  //todo..
  console.log('说话', args);
}
/**希望在调用say方法之前做一些事 */
/**Function.prototype给每个函数扩展一些功能 */
Function.prototype.before = function (cb) {
  return (...args) => {
    cb();
    //...有两个作用：剩余运算符、扩展运算符
    this(...args);
  }
}
let newSay = say.before(function () {
  console.log('before say');
})
newSay('a', 'b', 'c');
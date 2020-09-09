Object.create = function(obj) {
  //传入的如果不是对象或者null
  if (typeof obj !== 'object') {
    throw new TypeError('Object prototyope may only be an Object or null')
  }
  //创建一个函数
  var Anonymous = (function() {
    return function() {}; //这里函数自执行返回一个匿名函数(闭包的方式保存这个函数)，可以实现原生的Object.create的效果
  })();
  // var Anonymous = function() {};//这样new Anonyous生成的对象,在控制台能看到它属于Anonymous类

  //将其原型对象指向传入的对象
  Anonymous.prototype = obj;
  var newObj = new Anonymous;
  if (obj === null) {
    //如果传入的是null，把其__proto__属性置为null(防止低版本浏览器报错使用try...catch);
    try {
      newObj.__proto__ = null;
    } catch (err) {

    }
  }
  return newObj; //返回使用函数new初始化的对象
}
var obj = Object.create(null);
var obj2 = Object.create({ name: 'haha' });
console.log(obj)
console.log(obj2)
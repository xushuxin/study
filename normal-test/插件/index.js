(function() {
  "use strict";
  var myFn = function() {}; //插件方法
  var _global = this || (0, eval)("this"); //通过间接引用的方式来获取代码执行时的作用域
  console.log(_global);
  !("myFn" in _global) && (_global.myFn = myFn); //将自己的插件暴露给作用作用域对象
})();
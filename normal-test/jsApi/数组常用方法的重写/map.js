Array.prototype.myMap = function(callback, thisArg) {
  'use strict'; //使用严格模式，保证this的准确性
  //检测执行主体是否为call指向的null或undefined
  if (this == null) { //call在非严格模式下如果传入undefined或者null,函数中this指向全局对象
    throw new TypeError('Array.prototype.map called on null or undefined')
  }
  //检测传入的第一个参数是否为函数
  if (typeof callback !== 'function') { throw TypeError(typeof callback + ' is not a function') };

  //以下为主要逻辑代码
  let arr = Object(this); //把this转为对象
  let newArr = [], //创建空数组
    i = 0;
  while (i < arr.length) { //遍历原数组
    if (i in arr) {
      newArr[i] = callback.call(thisArg, arr[i], i, arr)
    }
    i++;
  }
  return newArr;
}

// test
let obj = {
  a: '哈哈',
  1: '1',
  2: '2',
  length: '2'
};
let newArr = Array.prototype.map.call(obj, function(item) {
  console.log(this)
  return item * 2;
}, obj)
console.log(newArr);
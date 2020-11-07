/**
 * race 函数返回一个 Promise，它将与第一个传递的 promise 相同的完成方式被完成。
 * 它可以是完成（resolves），也可以是失败（rejects），这要取决于第一个完成的方式是两个中的哪个。
 * 如果传的迭代是空的，则返回的 promise 将永远等待。
 * 如果迭代包含一个或多个非承诺值和/或已解决/拒绝的承诺，则 Promise.race 将解析为迭代中找到的第一个值。
 */
let Promise = require("./完整版.js");

function isPromise(x) {
  if (x !== null && typeof x === 'object' || typeof x === 'function') {
    try {
      var then = x.then;
      if (typeof then === 'function') return true;
    } catch (err) {
      return false;
    }
  }
  return false;
}
Promise.race = function(arr) {
  //循环数组
  return new Promise(function(resolve, reject) {
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      if (isPromise(item)) {
        //[[PromiseState]]无法获取，这里是按照我们自己写的Promise来处理
        //如果Promise的状态已经变为成功或者失败，则直接把我们创建的promise的状态和值修改与其一致
        if (item.PromiseState === 'fulfilled') {
          item.then(function(value) {
            resolve(value)
          });
          return;
        }
        if (item.PromiseState === 'rejected') {
          item.catch(function(value) {
            reject(value)
          });
          return;
        }
        item.then(resolve, reject)
      } else {
        resolve(item);
      }
    }
  })
}
var p1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('p1')
  }, 1000)
});
var p2 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('p2')
  }, 1500)
});
var p3 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('p3')
  }, 2000)
});
var p4 = 'p4';
var p5 = Promise.reject('err-p5');
let p6 = Promise.race([p5, p4]);
p6.then(res => {
  console.log('p6', res)
}).catch(function(err) {
  console.log('error', err)
})
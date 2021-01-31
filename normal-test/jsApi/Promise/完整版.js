(function() {
  function Promise(executor) {
    //必须保证executor是一个函数
    if (typeof executor !== 'function') throw TypeError('Promise resolver ' + executor + ' is not a function');

    // self存储promise实例
    var self = this;
    self.PromiseState = 'pending';
    self.PromiseResult = undefined;
    self.onFulfilledCallbacks = [];
    self.onRejectedCallbacks = [];

    var run = function run(state, value, callbacks) {
      if (self.PromiseState !== 'pending') return;
      self.PromiseState = state;
      self.PromiseResult = value;
      //异步任务完成后，会调用resolve/reject,此时我们把之前then执行时存入的onFulfilledCallbacks/onRejectedCallbacks队列的函数依次执行（正常项目中，队列中只有一个函数，一个pending状态的的promise实例调用几次then，队列中就有几个成功/失败回调，顺序为调用then的顺序），并且执行也是异步的
      for (var i = 0; i < callbacks.length; i++) {
        callbacks[i](value);
      }
    };

    //执行resolve/reject都是修改当前实例的状态和结果,状态一旦改变，就不能再次修改状态
    var resolve = function resolve(value) {
      //如果是要resolve的是一个当前Promise的实例，采用其状态和结果
      if (value instanceof Promise) return value.then(resolve, reject);
      run("fulfilled", value, self.onFulfilledCallbacks)
    }
    var reject = function reject(reason) {
      run("rejected", reason, self.onRejectedCallbacks)
    }

    //立即执行executor函数:如果函数执行报错了，则promise状态也要改为失败态
    try {
      //resolve/reject传给外部，则外部可以修改promise实例的状态(比如请求到数据之后resolve传递结果)
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }

  }
  /*  //访问一个对象或者函数的属性可能报错
  Object.defineProperty(window, 'then', {
    get() {
      throw '哈哈哈'
    }
  }); */

  //根据onfulfilled/onrejected执行返回值统一处理then返回的promise实例的状态和结果
  function resolvePromise(promise, x, resolve, reject) {
    //如果onfulfilled、onrejected方法执行的返回值和创建的新实例是同一个东西，则产生死循环，我们直接让其报错
    if (x === promise) {
      return reject(new TypeError("Chaining cycle detected for promise #<Promise>"));
    }
    //如果是一个对象/函数
    if (x !== null && typeof x === "object" || typeof x === "function") {
      var called = false;
      try { //try...catch防止访问then属性报错
        var then = x.then;
        if (typeof then === "function") {
          //返回结果是一个新的promise实例（不一定是自己构建的，也可能是别人构建的）
          then.call(x, function(y) {
            if(called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          }, function(r) {
            if(called) return;
            called = true;
            reject(r);
          })
        } else {
          resolve(x);
        }
      } catch (err) {
        if(called) return;
        called = true;
        reject(err);
      }

    } else {
      //否则直接成功，并传递值
      resolve(x);
    }
  }

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
  //Promise的原型
  Promise.prototype = {
    customize: true, //标记是否为自定义的Promise
    constructor: Promise,
    then: function(onfulfilled, onrejected) {
      //处理onfulfilled/onrejected不传递的情况
      typeof onfulfilled !== 'function' ? onfulfilled = function(value) { return value; } : null;
      typeof onrejected !== 'function' ? onrejected = function(err) { throw err; } : null;
      //self：原始的promise实例
      //promise:新返回的Promise实例「resolve/reject控制它的成功和失败」
      //但是到底执行resolve/reject哪个方法，是由onfulfilled/onrejected方法执行是否报错，以及它的返回结果是否为Promise实例来决定的
      var self = this;
      var promise = new Promise(function(resolve, reject) {
        switch (self.PromiseState) {
          case 'fulfilled':
            setTimeout(function() {
              try {
                var x = onfulfilled(self.PromiseResult); //获取成功回调的结果
                resolvePromise(promise, x, resolve, reject);
              } catch (err) {
                reject(err); //报错，则让新返回的Promise实例变为失败态，结果为错误原因
              }
            })
            break;
          case 'rejected':
            setTimeout(function() {
              try {
                var x = onrejected(self.PromiseResult); //获取失败回调的结果
                resolvePromise(promise, x, resolve, reject);
              } catch (err) {
                reject(err); //报错，则让新返回的Promise实例变为失败态，结果为错误原因
              }
            })
            break;
          default:
            //这样写的目的：把onfulfilled、onrejected放在不同给的容器中，后期知道状态改为啥后，通知某个容器中的方法执行，其实最后执行的就是存储进来的onfulfilled、onrejected
            // self.onFulfilledCallbacks.push(onfulfilled);
            // self.onRejectedCallbacks.push(onrejected);
            // 现在处理方案：向容器中存储一些匿名函数，后期状态改变后，先把匿名函数执行（给匿名函数传递PromiseResult）,我们在匿名函数中再把最后需要执行的onfulfilled、onrejected执行，这样达到了相同的结果，但是我们可以监听onfulfilled、onrejected执行是否报错和他们的返回值了
            self.onFulfilledCallbacks.push(function(PromiseResult) {
              setTimeout(function(){
                try {
                  var x = onfulfilled(PromiseResult); //获取成功回调的结果
                  resolvePromise(promise, x, resolve, reject);
                } catch (err) {
                  reject(err)
                }
              })
            })
            self.onRejectedCallbacks.push(function(PromiseResult) {
              setTimeout(function(){
                try {
                  var x = onrejected(PromiseResult); //获取失败回调的结果
                  resolvePromise(promise, x, resolve, reject);
                } catch (err) {
                  reject(err);
                }
              })
            })
            break;
        }
      })
      return promise;
    },
    catch: function(onrejected) { //相当promise.then(null,onrejected)
      return this.then(null, onrejected);
    },
    finally: function(onFinally) {
      let self = this;
      //返回的还是一个新的promise实例,
      //这个promise实例的状态由当前promise的状态来决定
      //用户传递的函数执行报错也会把返回的promsie修改为失败态
      return new Promise(function(resolve, reject) {
        var tryDoFinally = function() {
          try {
            onFinally() //执行传递的finally函数，finally函数没有传参
          } catch (err) {
            reject(err) //执行报错把返回的promise变为rejected状态，传递原因
          }
        };
        //成功或者失败都会执行一下用户传递的函数
        self.then(function(value) {
          tryDoFinally();
          resolve(value); //修改返回的promise变为fulfilled状态，传递结果
        }, function(reason) {
          tryDoFinally();
          reject(reason); //修改返回的promise变为rejected状态，传递原因
        });
      })
    }
  }
  Promise.resolve = function resolve(value) {
    return new Promise(function(resolve) {
      resolve(value)
    })
  }
  Promise.reject = function reject(reason) {
    return new Promise(function(_, reject) {
      reject(reason)
    })
  };

  Promise.all = function all(arr) {
    return new Promise(function(resolve, reject) {
      var index = 0,
        results = [],
        getIndexValue = function(i, value) {
          results[i] = value;
          if (++index === arr.length) {
            resolve(results);
          }
        };
      for (var i = 0; i < arr.length; i++) {
        (function(i) {
          var item = arr[i];
          if (isPromise(item)) {
            item.then(function(value) {
              getIndexValue(i, value)
            }, function(reason) {
              reject(reason); //只要有一个报错，整体就是失败的
            });
          } else {
            getIndexValue(i, item);
          }
        })(i)

      }
    })
  };
  Promise.race = function race() {};

  var _global = typeof window !== "undefined" ? window : global;
  _global.Promise = Promise;
})();

//测试
Promise.deferred = function(){
  let deferred = {};
  deferred.promise = new Promise((resolve,reject)=>{
    deferred.resolve = resolve;
    deferred.reject = reject;
  })
  return deferred;
}
module.exports = Promise;

/* //测试resolve的结果是一个promise
//当resolve的值是一个promise，会继续解析这个promise的状态和值，采用这个promise的状态和值作为当前promise的状态和值
//reject的值不做任何处理
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(Promise.reject('NO')); //reason NO
    // reject(Promise.resolve('NO')); //reason Promise {PromiseState: 'fulfilled',PromiseResult: 'NO'}
  }, 1000);
});
p1.then(value => {
  console.log('value', value)
}, reason => {
  console.log('reason', reason)
}); */

//测试返回结果是一个promise
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('YES');
  }, 1000);
});
//promise.then的成功回调/失败回调返回值如果是fulfilled的promise，则继续解析其状态和值作为返回的promise的状态和值
//rejected的状态的promise不做任何处理，直接返回
p1.then(value => {
  return Promise.resolve(Promise.reject(value));
  // return Promise.reject(Promise.resolve(value));
}, reason => {
  console.log('reason1', reason)
}).then(value => {
  console.log('value', value); //value YES
}, reason => {
  console.log('reason2', reason)
});

//穿透(不传函数)
// let p2 = p1.then(null /* value=>value */ , null /*reason=> throw reason */ );

// let p3 = p2.then(value => {
//   console.log('成功', value)
//   return Promise.reject(100);
// }, reason => {
//   console.log('失败', reason);
//   return 0;
// });
// p3.then(value => {
//   console.log('成功', value)
// }, reason => {
//   console.log('失败', reason);
// });
// Promise.all([p1, p2, 1]).then(res => {
//   console.log(res)
// })
// let p4 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject('OK');
//   }, 1000);
// })
// var p5 = p4.finally(() => {
//   // throw 'error666';//如果p4的状态是rejected或者finally回调执行报错，会在控制台抛出异常(无法模拟)
//   console.log('finally')
// })
// setTimeout(() => {
//   console.log(p5);
// }, 3000)
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
      setTimeout(function() {
        for (var i = 0; i < callbacks.length; i++) {
          let itemFn = callbacks[i];
          if (itemFn === 'function') itemFn(value);
        }
      })
    };

    //执行resolve/reject都是修改当前实例的状态和结果,状态一旦改变，就不能再次修改状态
    var resolve = function resolve(value) {
      run("fulfilled", value, self.onFulfilledCallbacks)
    }
    var reject = function reject(reason) {
      run("rejected", reason, self.onRejectedCallbacks)
    }

    //立即执行executor函数:如果函数执行报错了，则promise状态也要改为失败态
    try {
      //resolve/reject传给外部，则内部外部都可以修改promise实例的状态
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }

  }

  Promise.prototype = {
    customize: true, //标记是否为自定义的Promise
    constructor: Promise,
    then(onfulfilled, onrejected) {
      var self = this;
      //根据状态不同，执行不同方法，处理不同的事情
      // 执行then的时候，哪怕此时已经知道状态了，也不是立即把onfulfilled/onrejected执行，需要把函数执行设置为异步操作：设置一个定时器，默认是浏览器最快的反应时间后执行，但是本身属于异步操作
      //如果执行then时，还不清楚实例的状态（例如：executor函数中是一个异步操作），此时我们应该先把then调用传入的onfulfilled/onrejected存储起来,在以后executor函数中异步任务结束，把resolve/reject执行时，再把对应的onFulfilledCallbacks/onRejectedCallbacks队列执行
      switch (self.PromiseState) {
        case 'fulfilled':
          setTimeout(function() {
            onfulfilled(self.PromiseResult); //执行成功回调，并传值
          })
          break;
        case 'rejected':
          setTimeout(function() {
            onrejected(self.PromiseResult); //执行失败回调，并传递原因
          })
          break;
        default:
          /**状态pending就把两种结果的回调先分别存入到对应的队列中 */
          self.onFulfilledCallbacks.push(onfulfilled);
          self.onRejectedCallbacks.push(onrejected);
          break;
      }
    },
    catch () {}
  }

  window.Promise = Promise;
})()

let p1 = new Promise((resolve, reject) => {
  resolve('OK1');
  setTimeout(() => {
    resolve('OK');
    console.log(2); //内置的Promise先输出2，说明executor函数中异步任务完成后通知对应的onFulfilledCallbacks/onRejectedCallbacks队列执行也是异步的
  }, 1000);
  // reject('NO')
})

/**知识点：promise可调用多次then（多个异步的任务会在任务有结果后，按照.then执行的顺序依次执行） */
p1.then(value => {
  console.log('成功1', value)
}, reason => {
  console.log('失败1', reason)
})
p1.then(value => {
  console.log('成功2', value)
}, reason => {
  console.log('失败2', reason)
})
p1.then(value => {
  console.log('成功3', value)
}, reason => {
  console.log('失败3', reason)
})

console.log(1); //内置的promise的先输出1，再输出 "成功1 OK1",说明执行onfulfilled/onrejected回调的操作是异步的(也就是说then的回调函数执行是异步的，和executor中的任务是异步还是同步没有关系)
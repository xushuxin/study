console.log('----my----')
  //宏
const PENDING = 'PENDING'; //等待太
const FULFILLED = 'FULFILLED'; //成功态
const REJECTED = 'REJECTED'; //失败态
const resolvePromise = (promise2, x, resolve, reject) => {
  /**判断可能你的promise要和别人的promise来混用 */
  /**可能不同的promise库之间要相互调用 */
  if (promise2 === x) { //x如果和promise2引用的同一个promise,永远不能成功或者失败，直接报错即可
    return reject(new TypeError('[Chaining cycle detected for promise #<Promise>]'))
  }
  /**我们要判断x的状态，判断x是不是promise */
  /**先判断是不是对象或者函数 */
  if (typeof x === 'object' && x !== null || typeof x === 'function') {
    let called; //为了考虑别人的promise不健壮，所以我们需要自己去判断一下，只能调用一次成功或者失败
    try { //每次取then时都需要判断是否会报错（definedProperty定义的方法中可能会有逻辑导致不是每次取都取到）
      let then = x.then; //取出then方法，这个then方法时采用definedProperty来定义的（有可能抛错）
      if (typeof then === 'function') { //判断then是不是一个函数
        //只能认准是x一个promise了
        then.call(x, y => { //主动调用这个promise的then函数，获取这个promise的状态和结果
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject); //采用这个promise的返回结果
        }, r => {
          if (called) return;
          called = true;
          reject(r); //采用这个promise的失败结果
        })
      } else { //如果不是，说明x是一个普通对象或者函数
        resolve(x)
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e)
    }
  } else {
    //肯定不是promise
    resolve(x); //直接成功
  }
}
class Promise {
  constructor(executor) {
      this.status = PENDING; //初始化状态为pending
      this.value = undefined; //成功返回的结果
      this.reason = undefined; //失败返回的原因
      this.onFulFilledCallbacks = []; //存放成功时的回调
      this.onRejectedCallbacks = []; //存放失败时的回调
      let resolve = (value) => { //用户调用resolve方法时修改状态为成功态，仅可改变一次
        /**如果创建promise时resolve的是一个promise,需要调用这个promise的then获取他的结果 */
        if (value instanceof Promise) {
          return value.then(resolve, reject)
        }
        if (this.status == PENDING) {
          this.status = FULFILLED;
          this.value = value
            //这里会依次执行then函数时（promise处于pending状态）存入的成功回调函数，解决异步调用resolve()的问题
          this.onFulFilledCallbacks.forEach(fn => fn())
        }
      }
      let reject = (reason) => { //用户调用reject方法时修改状态为失败态，仅可改变一次
        if (this.status == PENDING) {
          this.status = REJECTED;
          this.reason = reason;
          //这里会依次执行then函数时（promise处于pending状态）存入的失败回调函数，解决异步调用reject()的问题
          this.onRejectedCallbacks.forEach(fn => fn())
        }
      }

      try { //try+catch只能捕捉同步的错误
        //创建promise时立即执行
        executor(resolve, reject); //promise中用户传入的回调函数，excecutor执行时 需要传入两个参数，给用户改变状态用
      } catch (err) {
        reject(err); //执行失败时主动触发reject事件改变当前promise状态为rejected
      }
    }
    /**1.只要x是一个普通值就会让下一个promise变成成功态 */
    /**2.x有可能是一个promise,需要采用这个promise的状态以及返回值，失败原因*/
  then(onFulFilled, onRejected) {
    /** 穿透
     * 如果用户传递的成功回调或者失败回调不是一个函数，那么
     * 成功回调：
     * 我们会传一个默认的回调，接收上一个promise传递的值，
     * 通过return的方式传递给下一个promise（90、91行 return的值会被传给下一个promise的成功回调）
     * 失败回调：
     * 我们会传一个默认的回调，接收上一个promise rejected的原因，
     * 通过throw err的方式抛出，可被下一个promise捕捉（87-92行 try+catch+reject）
     * 总结：用户不传，我们帮他传；用户不捕捉错误，我们帮他捕捉错误抛给下一个promise
     */
    onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : val => val;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) { //调用then方法时如果promise是成功态，执行成功回调
        setTimeout(() => {
          try {
            let x = onFulFilled(this.value);
            resolvePromise(promise2, x, resolve, reject); //把成功回调的返回值传给promise2的then函数
          } catch (err) {
            reject(err); //执行失败时主动触发reject事件改变当前promise状态为rejected
          }
        }, 0)
      }
      if (this.status === REJECTED) { //调用then方法时如果promise是失败态，执行失败回调
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject); //把失败回调的返回值传给promise2的then函数
          } catch (err) {
            reject(err); //执行失败时主动触发reject事件改变当前promise状态为rejected
          }
        }, 0)
      }
      //调用then时，如果promise仍处于PENDING状态（没有调用resolve、reject、抛错），这时会把所有的成功回调和失败回调全部分别放到一个数组中
      //等到调用resolve、reject时再把对应的数组拿出来遍历执行
      if (this.status === PENDING) {
        this.onFulFilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulFilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (err) {
              reject(err); //执行失败时主动触发reject事件改变当前promise状态为rejected
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (err) {
              reject(err); //执行失败时主动触发reject事件改变当前promise状态为rejected
            }
          }, 0)
        })
      }
    })
    return promise2; //返回一个新的promise
  }
  catch (errCallBack) { //一个没有成功回调的then
    return this.then(null, errCallBack)
  }
  static resolve(value){
    return new Promise(resolve=>{
      resolve(value)
    })
  }
  static reject(reason){
    return new Promise((_,reject)=>{
      reject(reason)
    })
  }
  finally(callback){
    //不管promise是成功还是失败态，调用其then方法执行用户回调即可
    this.then(()=>{
      callback()
    })
  }
}

//这里原生的promise；是我们为了产生一个延迟对象而做的处理
Promise.deferred = function() {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  })
  return dfd;
}

module.exports = Promise;
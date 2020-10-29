(function() {
  function Promise(executor) {
    //初始化promise实例的状态和值
    this.PromiseState = 'pending';
    this.PromiseResult = undefined;
    //resolve用于修改promise实例为成功态，并设置值
    var resolve = function resolve(value) {
      this.PromiseState = 'fulfilled';
      this.PromiseResult = value;
    };
    //reject用于修改promise实例为失败态，并设置原因
    var reject = function reject(reason) {
      this.PromiseState = 'rejected';
      this.PromiseResult = reason;
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err);
    }
  }
  window.Promise = Promise;
})()
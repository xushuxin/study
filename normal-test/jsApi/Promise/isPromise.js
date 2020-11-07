//判断一个值是否为Promise实例
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
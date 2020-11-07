function isPromise(x) {
  if (x !== null && typeof x === 'object' || typeof x === 'function') {
    try {
      var then = x.then;
      if (typeof then === 'function') return true;
    } catch (err) {
      return false
    }
  }
  return false;
}

Promise.all = function all(arr) {
  return new Promise(function(resolve, reject) {
    var index = 0,
      results = [],
      setIndexValue = function(i, value) {
        results[i] = value;
        if (++index === arr.length) {
          resolve(results);
        }
      };
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      if (isPromise(item)) {
        (function(i) {
          item.then(function(value) {
            setIndexValue(i, value)
          }, function(reason) {
            reject(reason);
          })
        })(i)
      } else {
        setIndexValue(i, item)
      }
    }
  })
}
var p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(0);
  }, 1000)
});
var p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 2000)
});
var p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 3000)
});
Promise.all([{}, p1, p2, p3, 3]).then(res => {
  console.log(res)
})
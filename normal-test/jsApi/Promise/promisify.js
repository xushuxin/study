let fs = require('fs');
let promisify = function promisify(fn) {
  return function(...params) {
    return new Promise((resolve, reject) => {
      fn(...params, function(err, data) {
        if (err) reject(err);
        resolve(data);
      })
    })
  }
};
let readFile = promisify(fs.readFile);
readFile('name.txt', 'utf8').then(data => {
  console.log(data);
}, reason => {
  console.log(reason)
})
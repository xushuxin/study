/**我们可以将node中异步的api转换成promise的写法 */
let fs = require('fs');
// let util=require('util');
// let read=util.promisify(fs.readFile)
/**实现 node的promisify方法 */
function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, function(err, data) {
        if (err) reject(err);
        resolve(data)
      })
    })
  }
}
let read = promisify(fs.readFile)

read('name.txt', 'utf8').then(data => {
  console.log(data)
});
// let fs = require('fs');

// function promisify(fn) {
//   return function(...args) {
//     return new Promise((resolve, reject) => {
//       fn(...args, function(err, data) {
//         if (err) reject(err);
//         resolve(data)
//       })
//     })
//   }
// }
// let read = promisify(fs.readFile);
// read('name.txt', 'utf8').then(data => {
//   console.log(data);
// }, (reason) => {
//   console.error(reason);
// })
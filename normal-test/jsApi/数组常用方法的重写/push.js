Array.prototype.push = function push(value) {
  this.length++;
  this[this.length - 1] = value;
}
// test
// var obj = {
//   0: 1,
//   1: 2,
//   length: 2
// };
// [].push.call(obj, 3);
// console.log(obj)
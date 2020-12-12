Array.prototype.push = function push(value) {
  this.length++;//length加1
  return this[this.length - 1] = value;//把最后一位赋值为传入的数，并返回出去
}
// test
var obj = {
  0: 1,
  1: 2,
  length: 2
};
[].push.call(obj, 3);
console.log(obj)
var arr = [1,2,3];
arr.push(4);
console.log(arr,arr.push(5))
//=>浅克隆：只复制对象或者数组的第一级内容
//对象
//1.ES6扩展运算符
let newObj = {
  ...obj
};
//2.Object.assign
let newObj = Object.assign({}, obj);
//3.for...in循环
// for in在遍历对象的时候，遍历是当前对象可枚举(列举)的属性
// + 私有属性（除一些特殊的内置属性是不可枚举的）
// + 公有属性（大部分都是不可枚举的，但是自己在类原型上扩展的一般都是可枚举的）
// + ...
// 也说明了在遍历的过程中，很可能遍历到共有的属性方法，所以for in的循环的时候，我们需要判断是否为私有的
let newObj = {};
for (let key in obj) {
  if (!obj.hasOwnProperty(key)) break;
  newObj[key] = obj[key];
}
// 数组
//1.ES6扩展运算符
let newArr = [...arr];
//2.Object.assign
newArr = Object.assign([], arr);
//3.各种循环和迭代
newArr = arr.map(item => item);
newArr = arr.slice();
newArr = arr.concat([]);
console.log(newArr, arr);
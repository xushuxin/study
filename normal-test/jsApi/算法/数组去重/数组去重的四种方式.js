/* 一、ES6 Set (获得到一个新的数组) */
var arr = [1, 2, 3, 2, 5, 6, 3, 4, 5, 3, 1, 3, 2, 7, 3];
// let newArr = Array.from(new Set(arr));
let newArr1 = [...new Set(arr)];
console.log(newArr, newArr1)

/* 二、拿出当前项(最后一项不用)和后面的内容比较 */
/* 这里可以有很多种实现方式
  1.indexOf>-1 & splice（1.需要处理数组塌陷 2.性能不好，当前项删除，后面的索引全部都要改变（减一））
  indexOf可以换成includes
*/
var arr = [1, 2, 3, 2, 5, 6, 3, 4, 5, 3, 1, 3, 2, 7, 3];
for (var i = 0; i < arr.length - 1; i++) {
  let curentItem = arr[i];
  others = arr.slice(i + 1);
  if (others.indexOf(curentItem) > -1) {
    arr.splice(i, 1);
    i--; //解决数组塌陷
  }
}
console.log(arr);

/* 
  2.创建新数组，indexOf===-1，push到新数组
*/
var arr = [1, 2, 3, 2, 5, 6, 3, 4, 5, 3, 1, 3, 2, 7, 3];
let newArr = [];
for (var i = 0; i < arr.length; i++) {
  let curentItem = arr[i];
  others = arr.slice(i + 1);
  if (others.indexOf(curentItem) === -1) {
    newArr.push(curentItem);
  }
}
console.log(newArr);
/* 
  3.如果检测到重复，当前项设置为null，最后把为null的项全部过滤
*/
var arr = [1, 2, 3, 2, 5, 6, 3, 4, 5, 3, 1, 3, 2, 7, 3];
for (var i = 0; i < arr.length - 1; i++) {
  let curentItem = arr[i];
  others = arr.slice(i + 1);
  if (others.indexOf(curentItem) > -1) {
    arr[i] = null;
  }
}
arr = arr.filter(item => item !== null);
console.log(arr);
/* 
  4.如果检测到重复，用最后一项替换当前项，再把最后一项删除（不会产生数组塌陷问题，且对数组其他项影响较小）
*/
var arr = [1, 2, 3, 2, 5, 6, 3, 4, 5, 3, 1, 3, 2, 3, 7];
for (var i = 0; i < arr.length - 1; i++) {
  let curentItem = arr[i];
  others = arr.slice(i + 1);
  if (others.indexOf(curentItem) > -1) {
    arr[i] = arr[arr.length - 1];
    arr.length--; //删除最后一项，也可以使用arr.pop()
    i--; //因为当前项被替换成最后一项，所以下次循环还需要从当前索引开始
  }
}
console.log(arr);
// 5.双循环(同样有数组塌陷和每次改变后续索引的问题)
var arr = [1, 2, 3, 2, 5, 6, 3, 4, 5, 3, 1, 3, 2, 7, 3];
for (var i = 0; i < arr.length - 1; i++) {
  for (var j = i + 1; j < arr.length; j++) {
    if (arr[i] === arr[j]) {
      arr.splice(i, 1);
      i--;
    }
  }
}
console.log(arr);
// 6.双循环(倒序+splice：1.删除当前项还是会影响后面的数组索引2.每次删除的都是已经遍历过后的项，不会影响循环)
var arr = [1, 2, 3, 2, 5, 6, 3, 4, 5, 3, 1, 3, 2, 7, 3];
for (var i = arr.length - 1; i > 0; i--) {
  for (var j = i - 1; j > -1; j--) {
    if (arr[i] === arr[j]) {
      arr.splice(i, 1);
    }
  }
}
console.log(arr);

/* 三、利用键值对（普通对象、Set、map）的方式 */
var arr = [1, 2, 3, 2, 5, 6, 3, 4, 5, 3, 1, 3, 2, 7, 3];
let obj = {};
for (var i = 0; i < arr.length; i++) {
  let curentItem = arr[i];
  if (curentItem in obj) {
    arr.splice(i, 1);
    i--;
    continue;
  }
  obj[curentItem] = curentItem;
}
obj = null;
console.log(arr);

/* 四、相邻项的处理方案 
  先排序，然后从第二项开始循环，每次循环把当前项与上一项比较
*/
//1.先排序，然后从第二项开始循环，每次循环把当前项与上一项比较
var arr = [1, 2, 3, 2, 5, 6, 3, 4, 5, 3, 1, 3, 2, 7, 3];
arr.sort((a, b) => a - b);
for (var i = 1; i < arr.length; i++) {
  if (arr[i] === arr[i - 1]) {
    arr.splice(i, 1);
    i--;
  }
}
console.log(arr);
//2.使用正则实现
var arr = [1, 2, 3, 2, 5, 6, 3, 4, 5, 3, 1, 3, 2, 7, 3];
arr.sort((a, b) => a - b);
var newArr = [];
var str = arr.join('@') + '@';
str.replace(/(\d+@)\1*/g, (val, group1) => {
  return newArr.push(group1.slice(0, -1));
});
console.log(newArr)
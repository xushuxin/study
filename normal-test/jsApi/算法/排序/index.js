//实现两个变量值互换的方法
//1.数组的解构赋值
var a = 1,
  b = 2;
[a, b] = [b, a];
console.log(a, b);
//2.声明一个变量来保存a的值，然后把b的值赋值给a,最后再把c的值赋值给b
var a = 1,
  b = 2;
var c = a;
a = b;
b = c;
console.log(a, b);
//3.如果是整数，可以使用求和的方式
var a = 1,
  b = 2;
a = a + b;
b = a - b;
a = a - b;
console.log(a, b);

/* 1.冒泡排序
  时间复杂度 指的是最高的复杂度O(n²)
  O(n)~O(n²)
    O(n)是数组本来就是已排序好的情况，只需要循环一次，比较一轮（n-1次）
    O(n²)是数组完全排序与我们想要的完全相反，需要循环n-1次，每次循环比较n-1-i次
  思路：相邻两项做比较，谁大，谁放到后面，一轮比较后，最大的放到了末尾；如果有n个数，我们只要进行n-1轮就可以实现从小到大排序
*/
//实现数组中两项(索引i/j)互换
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr; //用于链式调用数组api
}
Array.prototype.bubble = function bubble() {
  let flag = false; //用于判断每一轮循环结束是否排序已完成，没有触发交换代表已完成，跳出循环
  //控制循环次数（length-1次）
  for (var i = 0; i < this.length - 1; i++) {
    console.log(i);
    //控制比较的次数(一直比较到倒数第二项和最后一项对比完);
    //第一轮循环开始，有0个最大数冒泡到数组尾部，结束后有一个最大数冒泡到数组尾部；第二轮循环开始已经有1个冒泡到尾部，，，已经冒泡到对应位置的下次循环就不用再比较它了
    for (var j = 0; j < this.length - 1 - i; j++) {
      if (this[j] > this[j + 1]) { //如果当前项大于后一项，交换位置，把较大的一项放到后面
        swap(this, j, j + 1);
        flag = true;
      }
    }
    if (!flag) break;
    flag = false;
  }
  return this; //返回数组，方便链式调用数组方法
};
var arr = [24, 16, 12, 8, 1];
// var arr = [3, 2, 1, 4, 5];
arr.bubble();
console.log(arr);


// Array.prototype.bubble = function bubble() {
//   for (var i = 0; i < this.length - 1; i++) {
//     for (var j = i + 1; j < this.length; j++) {
//       if (this[i] > this[j]) {
//         swap(this, i, j)
//       }
//     }
//   }
// }

/* 2.插入排序法
  时间复杂度 O(n²)
  思路：先抓一张牌到手中，然后再从剩余牌中抓一张牌，和手中的牌比较，如果抓的牌大于手中的牌，就把它放到后面，如果小于，则继续和前面的牌比较，如果前面没有牌了，则这张牌是最小的，把它放到最前面即可
*/
Array.prototype.insert = function insert() {
  // 先抓一张牌,放到手中
  let handle = [this[0]];
  //再依次抓牌
  for (var i = 1; i < this.length; i++) {
    //当前抓的牌
    let A = this[i];
    //和手中的牌依次比较(从后往前比较)
    for (var j = handle.length; j > -1; j--) {
      let B = handle[j];
      // 如果A比B大，则把A插入到B后面,停止比较
      if (A > B) {
        handle.splice(j + 1, 0, A);
        break;
      }
      //如果比完了，没有比A小的，把A插入到最前面
      if (j === 0) handle.unshift(A);
    }
  }
  return handle;
};
var arr = [24, 16, 12, 8, 1];
arr = arr.insert();
console.log(arr);

/* 3.快速排序法（二分法） */
Array.prototype.quick = function quick() {
  let _this = this;
  //如果处理的数组只有一项，不去处理，直接返回
  if (_this.length <= 1) return _this;
  //获取中间项，并且把中间项在数组中删除
  let middleIndex = Math.floor(_this.length / 2),
    middleValue = _this.splice(middleIndex, 1)[0];

  let arrLeft = [],
    arrRight = [];
  for (let i = 0; i < _this.length; i++) {
    let item = _this[i];
    item < middleValue ? arrLeft.push(item) : arrRight.push(item);
  }
  return quick.call(arrLeft).concat(middleValue, quick.call(arrRight));
}
var arr = [24, 16, 12, 8, 1];
arr = arr.quick();
console.log(arr)
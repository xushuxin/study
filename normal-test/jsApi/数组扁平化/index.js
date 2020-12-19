/**
 * 已知如下数组：var arr=[[1,2,2],[3,4,5,5],[6,7,8,9,[11,12,[12,13,[14]]]],10];
 * 编写一个程序将数组扁平化并去除重复数据，最终得到一个升序并且不重复的数组
 */
var arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
];

/**1.扁平化数组 */
//①ES10新特性Array.prototype.flat(deepIndex)
var flatedArr = arr.flat(Infinity);
console.log('扁平化结果', flatedArr);

//②reduce+concat+isArray+recursivity(递归)
function flatArr(arr, tempArr) {
  return arr.reduce((res, item) =>
    res.concat(Array.isArray(item) ? flatArr(item) : item), [])
}
var flatedArr = flatArr(arr, [])
console.log('扁平化结果', flatedArr);

//③使用generator函数
function* flatGenerator(arr) {
  for (var item of arr) {
    Array.isArray(item) ? yield* flatGenerator(item) : yield item;
  }
}
var iterator = flatGenerator(arr);
var flatedArr = [...iterator];
console.log('扁平化结果：', flatedArr);

let resArrSet = [...new Set(flatedArr)];
console.log('去重结果', resArrSet)

/**3.升序排列 */
resArrSet.sort((a, b) => {
  return a - b;
})
console.log('升序结果', resArrSet)
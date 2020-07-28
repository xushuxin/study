/**
 * 已知如下数组：var arr=[[1,2,2],[3,4,5,5],[6,7,8,9,[11,12,[12,13,[14]]]],10];
 * 编写一个程序将数组扁平化并去除重复数据，最终得到一个升序并且不重复的数组
 */
var arr=[[1,2,2],[3,4,5,5],[6,7,8,9,[11,12,[12,13,[14]]]],10];

/**1.扁平化数组 */
//①ES10新特性Array.prototype.flat(deepIndex)
var resArr=arr.flat(Infinity)
console.log('扁平化结果',resArr)
//②reduce+concat+isArray+recursivity(递归)
// function dealArr(arr,tempArr){
//   return arr.reduce((res,item)=>
//     res.concat(Array.isArray(item)?dealArr(item):item)
//   ,[])
// }
// var resArr=dealArr(arr,[])
// console.log('扁平化结果',resArr)

/**2.数组去重 Set唯一性 */
var resArrSet=[...new Set(resArr)]
console.log('去重结果',[...resArrSet])

/**3.升序排列 */
resArrSet.sort((a,b)=>{
  return a-b;
})
console.log('升序结果',resArrSet)



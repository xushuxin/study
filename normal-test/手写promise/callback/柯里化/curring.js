/**
 * 函数柯里化
 */
/**判断一个变量的的类型 四种方式：①constructor ②instanceof ③ typeof  ④Object.prototype.toString.call */
// function checkType(content,type){
//   return Object.prototype.toString.call(content) === `[object ${type}]`;
// }
// /**什么叫函数柯里化：把一个函数的范围进行缩小，让函数变得更具体一些 */
// let bool=checkType('hello','String');
// let bool2=checkType(false,'Boolean');
// console.log(bool)
// console.log(bool2)


// function checkType(type) {
//   //私有化，这个函數可以拿到上层函数的参数，这个空间不会被释放掉
//   return function (content) {
//     return Object.prototype.toString.call(content) === `[object ${type}]`;
//   }
// }
// let isString = checkType('String');
// let isBoolean = checkType('Boolean');
// let flag1 = isString('hello');
// let flag2 = isBoolean(true);
// console.log(flag1)
// console.log(flag2)


/**通用的函数柯里化，希望可以分开传递参数 */
/**如何实现通用的函数柯里化 */
// const add=(a,b,c,d,e,f)=>{
//   return a+b+c+d+e+f;
// }

const curring=(fn,...arr)=>{
  let len=fn.length;//函数的参数个数
  return (...args)=>{
    arr=arr.concat(args);
    if(arr.length<len){//数组长度未达到函数的长度时，继续合并参数
      return curring(fn,...arr);
    }
    /**获得所有参数时才执行 */
    return fn(...arr);
  }
}
// console.log(curring(add,1,2)(3)(4)(5)(6))

/**柯里化应用：封装检测类型的工具 */
function checkType(type,content){
  return Object.prototype.toString.call(content) === `[object ${type}]`;
}

let util={};
['Number','String','Boolean'].forEach(item=>{
  util['is'+item]=curring(checkType)(item);
})
let r=util.isString('hello');
let b=util.isBoolean(true);
console.log(r,b)
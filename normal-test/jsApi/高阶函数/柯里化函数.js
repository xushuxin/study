/**
 * 把一个多参数的函数，拆解成多个步骤传递参数
 * @param {需要柯里化的函数} fn 
 */
function curry(fn){
  var exec = (...sumArgs)=>{
    console.log(sumArgs)
    //参数未收集完之前，都会返回一个函数，利用闭包机制存储当前收集的参数
    return sumArgs.length === fn.length?fn(...sumArgs):(...newArgs)=>exec(...sumArgs,...newArgs);
  };
  return exec();
}
// test
//求和
function addSum(a,b,c,d){
  return a+b+c+d;
}
var fn =curry(addSum);
var sum = fn(1)(2,3)(4);
console.log(sum);

//求积
function mulSum(a,b,c,d){
  return a*b*c*d;
}
var fn2 =curry(mulSum);
var sum2 = fn2(1)(2,3)(4);
console.log(sum2);
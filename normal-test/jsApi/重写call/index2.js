// Function.prototype.call=function(_this,...args){
//   if(!/^(object|function)$/.test(typeof _this)){
//     _this = Object(_this);
//   }
//   let key = Symbol('key');
//   _this[key] = this;
//   let res = _this[key](...args);
//   delete _this[key];
//   return res
// }
// Function.prototype.apply = function(_this,args){
//   if(!/^(object|function)$/.test(typeof _this)){
//     _this = Object(this);
//   }
//   let key = Symbol('key'),res;
//   _this[key] = this;
//   res = _this[key](...args);
//   delete _this[key];
//   return res;
// }
// Function.prototype.bind = function(_this,...args){ 
//   let fn =this;
//   return function(...innerArgs){
//     return fn.call(_this,...args,...innerArgs)
//   }
// }
Function.prototype.bind=function(_this,...args){
  return (...innerArgs)=>this.call(_this,...args,...innerArgs)
}
function fn(...args){
  console.log(this.age)
  console.log(args)
  return '哈哈'
}

let obj = {
  age:10
}
let bindFn = fn.bind(obj,[1,2,3])
console.log(bindFn(4,5,6))
Array.prototype.reduce= function reduce(fn,initParams){
  var result = initParams,startIndex=0;
  if(result == undefined){
    result = this[0];
    startIndex = 1;
  }
  for(var i = startIndex;i < this.length;i++){
    result=fn(result,this[i],this);
  }
  return result;
};
var arr = [1,2,3];
let result = arr.reduce((result,item,arr)=>{
  return result +item;
},3)
console.log(result);
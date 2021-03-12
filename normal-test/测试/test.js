class Iterator{
  constructor(assemble){
    this.assemble = assemble;
    this.index= 0;
  }
  next(){
    if(this.index>this.assemble.length-1){
      return {
        done:true,
        value:undefined
      }
    }
    return {
      done:false,
      value:this.assemble[this.index++]
    }
  }
}
let obj = {
  0:10,1:20,2:30,
  length:3,
  [Symbol.iterator]:Array.prototype[Symbol.iterator]
};
// obj[Symbol.iterator] = function(){
//   return new Iterator(this)
// }
for(var item of obj){
  console.log(item)
}
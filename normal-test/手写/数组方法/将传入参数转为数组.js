// 实现一个将传入参数转为数组的方法
function toArray(){
    let arr = [];
    for(let i = 0 ;i < arguments.length;i++){
        arr.push(arguments[i]);
    }
    return arr;
}
function toArray(){
    return [].slice.call(arguments);
}
function toArray(...args){
    return args;
}
function toArray(){
    return [...arguments];
}

function toArray(){
   return Array.from(arguments);
}
// test
console.log(toArray(1,2,3,4,5)) 

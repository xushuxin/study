//返回一个promise
//数组有一个resolve或者reject，就把当前promise的状态和值改变与其一致
//如果有普通值，直接将promise变为成功态，第一个普通值作为成功态的值返回
// let fs=require('fs').promises;
// let Promise=require('./promise');
Promise.race = function(arr){
  return new Promise((resolve,reject)=>{
    for(var i = 0;i<arr.length;i++){
      let item = arr[i];
      if(item && typeof item.then === 'function'){
        item.then(resolve,reject)
      }else{
        resolve(item)
      }
    }
  })
}
//~test~
let p1 = function(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve('p1 value')
    },3000)
  })
}
let p2 = function(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve('p2 value')
    },2000)
  })
}
let p3 = function(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve('p3 value')
    },1500)
  })
}
let p4 = function(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      reject('p4 error')
    },1499)
  })
}
Promise.race([p1(),p2(),p3(),p4()]).then(res=>{
  console.log(res)
},reason=>{
  console.log(reason)
})
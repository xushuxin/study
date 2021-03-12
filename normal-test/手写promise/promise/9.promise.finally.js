//主要实现在promise.js
// test
// let Promise =  require('./promise');

new Promise((resolve,reject)=>{
  setTimeout(()=>{
    // resolve('promise resolved')
    // reject('promise rejected')
    throw Error('promise error')
  },1000)
}).then(res=>{
  console.log(res)
},reason=>{
  console.log(reason)
}).finally((value)=>{
  console.log(value);//undefined finnaly不传递任何值
  console.log('finally execute');
})
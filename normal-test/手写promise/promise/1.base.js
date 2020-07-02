/**
 * 什么是promise，解决哪些问题（缺陷：基于回调）
 * 1.回调地狱
 * 2.多个请求并发问题（并发读取文件）
 * 
 */
// Promise是一个类，类只要用的时候new一下
//1.在new Promise时需要传递一个执行器函数executor,这个函数默认会立即被执行
//2.每个promise都有三个状态 pending等待态 fullfilled成功态 rejected失败态
//3.默认创建一个promise是等待态 默认提供两个函数 resolve让promise变成成功态 reject让promise变成失败态
//4每个promsie的实例都具备一个then方法，then方法中传递两个参数1.成功的回调2.失败的回调
//5、如何让promise变成失败态 reject()/throw Error()
//6.如果多次调用成功或者失败，只会执行一次，一旦状态变化了，就不能再变为其他状态
let Promise=require('./promise.js');
let promise=new Promise((resolve,reject)=>{
    setTimeout(()=>{//异步调用
      resolve('value')
    },1000)
//  reject('reson');
//  resolve('value');
//  throw Error('我报错了');
})

promise.then(success=>{
  console.log('success',success);
},error=>{
  console.log('fail',error)
})
promise.then(success=>{
  console.log('success',success);
},error=>{
  console.log('fail',error)
})
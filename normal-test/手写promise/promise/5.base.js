let Promise =require('./promise');

var p = new Promise((resolve,reject)=>{
  resolve(new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve('hello')
      // reject('hello')
    },1000);
  }))
 })
 p.then(data=>{
   console.log(1,data)
 }).catch(err=>{
   console.log(2,err)
 })
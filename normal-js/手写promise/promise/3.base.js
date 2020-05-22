/**promsie的穿透 */
let Promise =require('./Promise');
let p=new Promise((resolve,reject)=>{
  resolve('hello');
  // reject('error')
})
 
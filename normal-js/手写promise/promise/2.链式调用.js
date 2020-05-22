const fs=require('fs');
function read(...args){
  return new Promise((resolve,reject)=>{
    fs.readFile(...args,function(err,data){
      if(err) reject(err)
      resolve(data);
    })
    
  })
}      

//promise是通过链式调用的方式解决了这个问题
//成功的回调和失败的回调都可以返回一个结果
//情况1：如果返回的时一个promise，那么会让这个promise执行，并且采用他的状态，将成功或者失败的结果传递给外层下一个then中
//情况2：如果返回的是一个普通值，会把这个值作为外层的下一次then的成功的回调的参数
//情况3：抛出一个异常

let promise=read('name.txt','utf8');
/**情况1：返回的是fulfilled状态的promise */
// promise.then(data=>{
//   return read(data,'utf8');
// }).then(data=>{//触发
//   console.log('成功啦,得到上个then函数中promise的resolve的值：',data);
// },err=>{
//   console.log('失败了，获得到上个then函数中promise的reject的值：',err)
// })
//情况1：返回的是rejected状态的promise
// promise.then(data=>{
//   return read(data+'1','utf8');
// }).then(data=>{
//   console.log('成功啦,得到上个then函数中promise的resolve的值：',data)
// },err=>{//触发
//   console.log('失败了：',err)
// })
//情况2：如果返回的时一个普通值，会把这个值传递给外层的下一次then的成功的回调
// promise.then(data=>{
//   return '我是一个普通值';
// }).then(data=>{//触发
//   console.log('成功啦,得到上个then函数中return的普通值：',data)
// },err=>{//不会触发
//   console.log('失败了：',err)
// })
//情况3：抛出一个异常
promise.then(data=>{
  return read(data,'utf8');
}).then(data=>{//触发
  console.log(data)
  throw Error('error')
},err=>{//这个回调不会捕捉成功回调的错误
  console.log('捕获了错误',err)
}).catch(err=>{
  console.log('只要上面没有捕获错误，就会执行这个catch',err);
})

/**
 * catch(err=>{
 * 
 * })相当于then(null,err=>{
 * 
 * }) 
 * */
/**
 * promise如何实现链式调用:
 * jq是返回this，
 * promise的链式调用是返回一个新的promise
 */
/**
 * promise必须返回一个全新的promise，
 * 这样可以解决promise的状态问题，
 * 否则可能会出现刚开始成功又变成了失败状态
 */




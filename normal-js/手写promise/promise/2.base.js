let Promise = require('./promise')

let promise=new Promise((resolve,reject)=>{
  resolve('hello')
  // reject('error')
}) 
/**promise2是promise的then函数的返回值 */
/**1.promise的then函数的成功回调、失败回调中的返回值都会传给promise2的then函数回调 */
// let promise2=promise.then(data=>{
//   return data;//如何让data向下传递：调用promise2的resolve方法
// },err=>{
//   return err;//失败回调中的返回值也会传递给下一个promise的then
// });
// promise2.then(data=>{
//   console.log('success',data)
// })

/**2.promise的then函数中的抛错会被
 * 使promise2的状态变为reject状态
 * 原因：因为Promise在创建实例时会立即执行
 * 传入的回调函数，并且使用try...catch捕捉到错误
 * 并把使用自己的reject方法把当前promise变为rejected状态
 * 后面调用then函数时就会调用失败回调
*/
/*补充说明：
 * promise调用成功回调和失败回调都被包含在创建promise2时传入的回调函数内
 * 所以如果promise的then函数的成功回调或者失败回调中抛错
 * 都会被promise2捕捉到，并使promise2变为失败态
 */
// let promise2=promise.then(data=>{
//   throw Error('我是promise成功回调的报错')
// },err=>{
//   throw Error('我是promise失败回调的报错')
// });
// promise2.then(success=>{
//   console.log(success)
// },err=>{
//   console.log(err)
// })

 /**3.promise的then函数中的成功回调和失败回调的返回值是promise */
//  let promise2=promise.then(data=>{
//    return new Promise((resolve,reject)=>{
//     //  resolve('我是promise成功回调函数中的返回的匿名promise的成功回调的值')
//      reject('我是promise失败回调函数中的返回的匿名promise的成功回调的值')
//    })
//  })
//  promise2.then(data=>{
//    console.log('success',data)
//  },err=>{
//    console.log('error',err)
//  })
/** 3.1promise的then函数回调返回的是promise2 */
// let promise2=promise.then(data=>{
//   return promise2;
// })
// promise2.then(data=>{
//   console.log('success',data)
// },err=>{
//   console.log('error',err)
// })

/**4.返回的是一个promise里面嵌套了promise*/
let promsie2=promise.then(data=>{
  return new Promise((resolve,reject)=>{
    resolve(new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve('hello world')
      },1000)
    }))
  })
})
promsie2.then(data=>{
  console.log('success:',data);
},err=>{
  console.log('error:',err)
})
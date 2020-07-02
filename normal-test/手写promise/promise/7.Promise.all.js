/**
 * promise.all方法表示等待所有promise全部成功后才会执行回调；
 * 如果有一个promise失败则promise就失败了
 * */
let fs=require('fs').promises;
let Promise=require('./promise')

const isPromise=(value)=>{//判断一个值是否为promise
  if((typeof value ==='object' &&value!==null)||typeof value ==='function'){
    return typeof value.then==='function';
  }
  return false;
}
Promise.all = function(promises){
  return new Promise((resolve,reject)=>{
    let arr =[];//返回的数组
    let i=0;//异步并发，计数器
    /**将所有的值按照传入的顺序放入到数组中对应位置，当所有值都放入数组时，将promise resolve*/
    let processData=(index,data)=>{
      arr[index]=data;
      if(++i==promises.length){
        resolve(arr)
      }
    }
    /**循环传入的数组，普通值直接放入数组，promise通过then方法获得结果 */
    for(let i=0;i<promises.length;i++){//这里有异步，所以使用let
      let current = promises[i];
      if(isPromise(current)){//如果是promise，调用then方法，成功添加到数组；失败直接reject
        current.then(data=>{
          processData(i,data)
        },reject)
      }else{
        processData(i,current)
      }
    }
  })
}
let p=new Promise((resolve,reject)=>{
  resolve(new Promise((resolve,reject)=>{
    resolve('666')
  }))
})
Promise.all([1,2,3,p,fs.readFile('name.txt','utf8'),fs.readFile('age.txt','utf8'),4,5]).then(values=>{
  console.log(values)
},err=>{
  console.log(2,err)
})
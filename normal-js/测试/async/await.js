async function fn(){
  let promise=new Promise((resolve,reject)=>{
    setTimeout(_=>{
      resolve('data')
    },0)
  })
  let promsie2= promise.then(res=>{//这里面的回调函数会在then时立即执行，new Promise()
    console.log('获得数据',res)
    this.data=res;
    //这里如果有异步操作（比如请求），外面会拿不到该异步操作的结果
  })
  promsie2.then(res=>{
    console.log('现在可以获取data:',this.data)
  })
}
fn();
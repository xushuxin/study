let fs = require('fs');
let Promise = require('./promise') 
//如何产生一个延迟对象
function read(){
  let dfd=Promise.deferred();//1
  fs.readFile('name.txt','utf8',function(err,data){
    if(err){
      dfd.reject(err);//2.1
    }
    dfd.resolve(data)//2.1
  })
  return dfd.promise;//3
}

read().then(data=>{
  console.log(1)
  console.log(data)
})
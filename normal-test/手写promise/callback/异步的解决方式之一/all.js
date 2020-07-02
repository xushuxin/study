const fs=require('fs');

//并发操作
const after =(times,fn) => {
  let renderObj={};
  return function(key,value){
    renderObj[key]=value;
    --times == 0 && fn(renderObj);
  }
}
let out=after(2,(renderObj)=>{
  console.log(renderObj);
})
let renderObj={};
fs.readFile('./name.txt','utf8',function(err,data){
  out('name',data);
})
fs.readFile('./age.txt','utf8',function(err,data){
  out('age',data);
})



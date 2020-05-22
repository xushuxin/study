const fs=require('fs');
/**订阅 ：就是将要做的事情先存储好，稍后发布的时候让订阅好的事情依次执行 */
let event={//发布订阅，两者没有任何联系
  arr:[],
  on(fn){
    this.arr.push(fn);
  },
  emit(){
    this.arr.forEach(fn=>fn());
  }
}
let renderObj={};
event.on(()=>{
  console.log('读取到了数据')
  if(Object.keys(renderObj).length===2){
    console.log('都读取完毕了')
  }
})
fs.readFile('./name.txt','utf8',function(err,data){
  renderObj['name']=data;
  event.emit()
})
fs.readFile('./age.txt','utf8',function(err,data){
  renderObj['age']=data;
  event.emit()
})
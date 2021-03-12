let fs = require('fs');
let path = require('path');

//创建文件夹保证父级文件夹存在
fs.mkdir('./a',(err)=>{
  console.log(err);
})
fs.mkdir('./a/1',(err)=>{
  console.log(err);
})
fs.mkdir('./a/2',(err)=>{
  console.log(err);
})
fs.mkdir('./b/1',{
  recursive:true//不管父文件夹是否存在，都创建
},(err)=>{
  console.log(err);
})

//读取目录
fs.readdir('./a',(err,data)=>{
  console.log(data);
})

//查看文件信息
fs.stat('./a',(err,stats)=>{
  console.log(stats.isFile())//判断前路径是否是一个文件
  console.log(stats.isDirectory())//判断前路径是否是一个文件夹
})

//12.10.0版本支持recursive
//12.10.0之前需要自己封装
fs.rmdir('./a',{
  recursive:true//递归删除，可以文件夹有内容也会被删除，相当于rm -rf
},(err=>{

}))
//删除文件夹或者文件 14.14.0版本新增
fs.rm('./a/1.txt',{
  force:true,//如果文件不存在，异常被忽略
  recursive:true//递归删除
},(err)=>{
  console.log(err);
})

//封装一个删除文件的方法
function rmdir(dir,cb){
  //判断文件还是文件夹
  fs.stat(dir,(err,stats)=>{
    if(stats.isFile()){//如果是一个文件
      fs.unlink(dir,cb);//删除文件
    }else{//否则是文件夹
      fs.readdir(dir,(err,dirs)=>{
        //获取和父目录和子目录/子文件的拼接路径
        console.log(dirs)
        dirs = dirs.map(item =>path.join(dir,item))
        //如果没有子目录或者文件，说明是空文件夹，直接移除
        if(dirs.length === 0) {
          fs.rmdir(dir,cb)
        }else{//否则不是空文件夹，可能有文件或者文件夹
          //深度优先递归删除
          //每次删除文件或者文件夹成功一次，调用一次done
          //当前文件夹下的所有文件夹和文件全部删除后，删除当前文件夹
          let index = 0;
          function done(){
            console.log(index,dirs.length)
            if(++index === dirs.length){
              fs.rmdir(dir,cb);
            }
          }
          //循环删除文件或者文件夹
          for(let i = 0;i<dirs.length;i++){
            let dir = dirs[i];
            //递归删除文件或者文件夹
            rmdir(dir,done);
          }
        }
      })
    }
  })
}
rmdir('./a',function(err){
  console.log(err)
})
//  fs模块 ：内置模块 一般用来读写文件
//  fs模块的所有方法都有同步和异步之分(凡是带Sync的都是同步)
let fs = require('fs');
//fs.readFile(文件路径,)
fs.readFile('./test.txt',{
  encoding: 'utf-8',//读取文件的编码方式（如果不指定，默认是null，读取的数据是buffer格式）
  flag: 'r' //对应的操作标志（一般用不到，open操作经常用）
},(err,data)=>{
  //err 读取失败时候的错误信息,成功时为null
  //data 读取成功时的得到的数据，失败时为undefined
  if(err) throw err;//
  console.log(err,data)
})

//同步读取(捕捉错误使用try...catch)
let data  = fs.readFileSync('./test.txt',{encoding:'utf-8'});
console.log('同步读取的数据：',data);
console.log(123);


//promise方式调用
let pfs = fs.promises;
let p = pfs.readFile('./test.txt');
p.then(data=>{
  console.log('promise方式调用',data.toString())
})

//写文件(是一个覆盖的过程)
//fs.writeFile(写入文件路径,'写入的数据',options,callback)
//如果对应路径没有该文件，则会创建并写入内容
fs.writeFile('./test.txt','写入的数据',{
  encoding:'utf-8'//默认是utf-8
},(err)=>{
  if(err) throw err;
  console.log('文件写入成功')
})

//删除文件
fs.unlink('test.txt',(err)=>{
  //删除的时候如果不存在这个文件，就会报错
  console.log('删除成功')
})



fs.readFile('./test.txt',(err,data) => {
  if(err) throw err;
  let str = data;
  console.log('buffer',str)
  fs.writeFile('./test.txt',str + '重写文件的方式新增了一部分内容',(err)=>{
    if(err) throw err;
    console.log('写入成功')
  })
})

//以添加的方式写入文件（不会覆盖）
fs.appendFile('./test.txt','追加的方式增加一部分内容',(err)=>{
  if(err) throw err;
  console.log('添加内容成功')
})

pfs.appendFile('./test.txt','promise的方式调用',(err)=>{
  if(err) throw err;
  console.log('添加内容成功')
})

//读取添加其他文件的内容到另一个文件
fs.readFile('./test2.txt',(err,data)=>{
  //回车换行一起使用（兼容window）
  fs.appendFile('./test.txt','\r\n'+data,(err)=>{
    console.log('读取添加成功');
  })
})



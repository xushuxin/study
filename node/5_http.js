
// 修改配置 完成之后，每次都需要重启服务
//为了避免这个麻烦，我们可以使用nodemon，来帮我们自动重启服务
//安装： npm install -g nodemon
//使用：nodemon 文件名
let http = require('http');

//创建一个服务，访问这个服务的时候，会触发这个回调函数
let server = http.createServer((request,response)=>{
  console.log('有人访问')
  response.end('返回给访问者的数据')
})

//创建监听访问服务，访问服务时会调用回调
server.on('request',(req,res)=>{
    console.log('监听的方式调用')
})
const port = '8080'
server.listen(port,()=>{
  console.log(`server listen on ${port}`)
})
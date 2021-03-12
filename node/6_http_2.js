let http = require('http');

//创建一个服务，访问这个服务的时候，会触发这个回调函数
let server = http.createServer((request,response)=>{
  console.log('有人访问')
  console.log(request.method)
  console.log(request.url)
  response.end('返回给访问者的数据')
})

let port = 8080;
server.listen(port,()=>{
  console.log(`server listen on ${port}`)
})
server.on('error',(err)=>{
  console.log('报错信息',err);
  let {code} = err;
  if(code == 'EADDRINUSE'){//当前端口已被占用
    server.listen(++port);//端口号加1
  }
})


let http = require('http');
let fs = require('fs');
let pfs = fs.promises;

let server = http.createServer((req,res)=>{
  let { url } = req;
  console.log(url)
  if(url==='/'){ 
    url = 'index.html'
  }
  pfs.readFile('./public/'+url).then(data=>{
    res.end(data);
  }).catch(err=>{
    res.end(err);
  })
})


let port = 8080;
server.listen(port,()=>{
  console.log(`server listen on ${port}`)
})
server.on('error',(err)=>{
  let {code} = err;
  if(code == 'EADDRINUSE'){//当前端口已被占用
    server.listen(++port);//端口号加1
  }
})
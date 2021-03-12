let http = require('http');
let fs = require('fs');
let url = require('url');//专门用来处理域名和路径的
let pfs = fs.promises;
let path = require('path');
let mime = require('mime');//三方包，专门用来根据文件路径获取文件的媒体类型

// console.log(url.parse('/aaaa/bbbb?params#hash'))

// console.log(new URL('https://user:pass@sub.host.com:8080/p.a.t.h?query=string#hash '))

// console.log(mime.getType('./pulic/indec.html'))

class StaticServer{
  async handleRequest(req,res){
    let {pathname} = url.parse(req.url);

    if(pathname == '/list'){
      let options = {
        host:'localhost',
        port:3000,
        path:pathname,
        headers:req.headers
      }
      let req2 = http.get(options,(res2)=>{//代理请求
        res2.pipe(res);
      })
      req.pipe(req2);//把请求的可读流写入到req2
      return;
    }
    let filepath = path.join(__dirname,'./public',pathname)
    let stat = await pfs.stat(filepath);
    if(stat.isFile()){//如果是文件
      /* let file = await pfs.readFile(filepath);
      res.end(file); */
      //设置请求头中的内容类型（使用mime根据文件路径获取）
      res.setHeader('Content-Type',`${mime.getType(filepath)};charset=utf-8`);
      // res.statusCode = 204;//设置响应码
      // res.statusMessage = 'some message'//设置响应信息
      //使用可读流数据响应
      fs.createReadStream(filepath).pipe(res);
    }else{//默认返回index.html
      filepath = path.join(filepath,'index.html');
      fs.createReadStream(filepath).pipe(res);
    }
  }
  start(port,cb){
    let server = http.createServer(this.handleRequest.bind(this));
    server.on('error',function(err){
      if(err.code === 'EADDRINUSE'){
        server.listen(++port);
      }
    })
    server.listen(port,()=>{
      cb(port);
    })
  }
}
new StaticServer().start(9000,(port)=>{
  console.log(`server is listen on ${port}`);
})
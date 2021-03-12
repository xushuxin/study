let http = require('http');
let url = require('url');
let qs = require('querystring')

//req是可读流，res是可写流
//还可以自己使用fs.createStream创建可读流
let server = http.createServer((req,res)=>{
  // req.method 请求方法
  // req.url 请求的url
  //响应头设置，设置允许访问的源
  res.setHeader('Access-Control-Allow-Origin','*');

  //解析url获取路径和参数
  let {pathname,query} = url.parse(req.url,true);
  if(req.method.toLowerCase()=== 'get'){
    let reg = /\/list2\/(\w+)/;
    if(reg.test(pathname)){//如果是/list2开头,并且有参数
      console.log('list2后面的参数是：'+ pathname.match(reg)[1]);
    }else{  
      console.log(query);//获取get请求传参
    }
    res.end('get')
  }else{//post请求
    //post请求接收参数
    let ary = [];
    //接收到参数时触发回调
    console.log(url)
    req.on('data',function(chunk){
      console.log('post接收到body传递的参数时触发这个回调,获取到的是Buffer数据',chunk)
      ary.push(chunk);
    })
    req.on('end',function(){
      //Buffer.concat连接数组中所有的Buffer数据，合并为一个返回
      let bf = Buffer.concat(ary);
      console.log('合并后的原始数据',bf);
      try{
        //默认当做JSON格式来解析
        console.log('JSON数据解析',JSON.parse(bf.toString()));
      }catch(err){
        //报错了当做查询字符串来解析（FormData格式上送数据）
        console.log('qs解析查询字符串',qs.parse(bf.toString()))
      }
     
      res.end(bf)
    })
  }
})

server.listen(3000,()=>{
  console.log('listen on 3000');
})

//请求头： token cookie content-type
//响应头：Access-Control-Allow-Origin  Etag Expires Cache-Control
const http=require('http');
/**使用get方法向服务器发请求 */
http.get('http://www.baidu.com',function(res){
  // console.log(res.statusCode);
  res.on('data',function(bufferData){
    /**返回的数据是buffer数据 */
    console.log(bufferData)
  })
});
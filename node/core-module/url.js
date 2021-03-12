const url=require('url');
/**解析url */
var str='http://www.baidu.com:8080/course/1.html?name=xiaoming&age=19'
console.log(url.parse(str))
/**解析结果 */
// Url {
//   protocol: 'http:',         /**协议 */
//   slashes: true,
//   auth: null,
//   host: 'www.baidu.com:8080',
//   port: '8080',              /**端口 */
//   hostname: 'www.baidu.com', /**主机名（域名） */
//   hash: null,
//   search: '?name=xiaoming&age=19',
//   query: 'name=xiaoming&age=19',    /**查询字符串 */
//   pathname: '/course/1.html',       /**文件在服务器的路径 */
//   path: '/course/1.html?name=xiaoming&age=19',
//   href: 'http://www.baidu.com:8080/course/1.html?name=xiaoming&age=19'
// }
/**
 * 将对象转为url
 */
var obj={
  protocol:'https',
  hostname:'www.baidu.com',
  port:8080,
  pathname:'/products/list.html',
  // search:'name=xiaoming&age=19',/** 这种也可以，但是一般我们用下面的传对象的方式更方便 */
  query:{name:'xiaoming',age:20}/** 对象格式 */
}
console.log(url.format(obj));// https://www.baidu.com:8080/products/list.html?name=xiaoming&age=19
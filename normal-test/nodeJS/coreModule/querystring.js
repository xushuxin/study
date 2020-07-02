//node核心模块查询字符串
const querystring=require('querystring');
console.log(querystring)
/**
 * 将查询字符串解析为对象格式 
 * */
var string='name=xiaoming&age=19&sex=man';
console.log(querystring.parse(string))
/**
 * 将对象转为查询字符串格式
 */
var object={name:'xiaoming',age:19,sex:'man'}
console.log(querystring.stringify(object))
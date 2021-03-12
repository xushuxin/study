/**计时器 */
const fs=require('fs');
//读取文件状态（同步方法）
var res=fs.existsSync('num.txt');//返回值是Boolean类型
if(!res){/**如果不存在生成文件num.txt */
  fs.writeFileSync('num.txt',0);
}
//读取文件中的数字，加1打印出来
fs.readFile('num.txt',function(err,data){
  /**data是Buffer数据 */
  console.log(data)
  var num=data.toString();/**将buffer数据转为普通字符 */
  num=Number(num)+1;
  console.log(num)
  /**将num写入到文件中，先清除之前的内容再写入 */
  fs.writeFile('num.txt',num,function(err){
    if(err) throw err;
  })
})

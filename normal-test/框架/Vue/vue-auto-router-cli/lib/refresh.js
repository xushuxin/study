const fs = require('fs');//读写文件
const handlebars =require('handlebars');//模板引擎，用于编译

module.exports = async ()=>{
  //获取列表
  const list = fs.readdirSync('./src/views')//读取views目录下所有文件
    .filter(v=>v!=='Home.vue')//过滤掉Home.vue
    .map(v=>({
      //去除文件后缀，并转小写
      name:v.replace('.vue','').toLowerCase(),//路由名称
      file:v//文件名称，用于路由配置文件中查找文件
    }))
  //根据router.js.hbs模板生成路由配置文件router.js
  compile({list},'./src/router.js','./template/router.js.hbs');
  //根据模板App.vue.hbs生成App.vue文件（包含首页菜单）
  compile({list},'./src/App.vue','./template/App.vue.hbs');
  
  /**
   * 模板编译
   * @param {传递给模板引擎的参数} meta 
   * @param {目标文件路径} filePath 
   * @param {模板文件路径} templatePath 
   */
  function compile(meta,filePath,templatePath){
    if(fs.existsSync(templatePath)){
      //读取模板内容
      const content = fs.readFileSync(templatePath).toString();
      //使用handlebars模板引擎进行编译；柯里化函数，先传模板内容再传参数
      const result = handlebars.compile(content)(meta);
      //把编译结果写入到指定文件 （整体覆盖）
      fs.writeFileSync(filePath,result);
      console.log(`🚀${filePath} 创建成功！`);
    }
  }
}
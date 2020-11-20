/* 默认的配置文件，在这里可以进行配置合并 */
//webpack配置遵循commonJS语法规范，可以使用node的内置模块
console.log(__dirname);//获取当前文件所在目录的绝对路径
const path = require("path");
const dev = require("./webpack.dev"); 
const prod = require("./webpack.prod");
const {merge} = require("webpack-merge");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//当配置文件导出的为一个函数时，第一个参数接收命令行中--env传递的参数，具体规则参考官方文档
module.exports = (env=>{
  console.log(env)// env =>{development:true}/{production:true}
  let htmlPlugins = ['index','other'].map(entry=>{
    return new HtmlWebpackPlugin({
      template:`./template/${entry}.html`,//模板静态文件
      filename:`${entry}.html`,//打包后的文件名
      hash:true,
      minify:env.production?{
        removeAttributeQuotes:true,//去除属性的引号
        collapseWhitespace:true,//去除空格
        removeComments:true//去除注释
      }:false,
      inject:'body',//插入js的位置，默认body(设置为false则不引入js)
      chunks:[entry]//指定引入的js文件
    })
  });
  let base = {
    //多入口
    entry:{
      index:"./src/index.js",
      other:"./src/other.js"
    },
    output:{
      path:path.resolve(__dirname,"multiPageDist"),//所有的文件都打包到multiPageDist目录下
      filename:"[name].js"//name是和entry中属性名对应的
    },
    devServer:{
      port:9999,//本地服务端口，优先访问webpack打包目录文件
      open:true,//自动打开页面
      compress:true,//开启gzip压缩
      hot:true,//热更新，自动更新代码
      contentBase:path.resolve(__dirname,'contentBaseDir')//指定本地静态资源服务器的目录
    },
    plugins:[
      new CleanWebpackPlugin({
        //[指定删除的文件的路径*匹配所有, 排除指定的文件]如['cc/*','!cc/a.js']
        cleanOnceBeforeBuildPatterns:['*']
      }),
      ...htmlPlugins
    ]
  };
  if(env.development){
    //base和开发配置进行合并(相同属性后者覆盖前者的值)
    return merge(base,dev);
  }else{
    //base和生产环境进行合并
    return merge(base,prod);
  }
}) 
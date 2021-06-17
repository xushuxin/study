//单独配置开发环境的配置
const path = require("path");
const getNetworkIp = require('./getNetworkIp.js'); //获取本地IP地址
const { mockApi } = require('./mockApi'); //引入mockApi函数，用于mock接口数据
module.exports = {
  mode: "development",
  devtool: 'cheap-module-eval-source-map', //开发环境开启source map
  devServer: {
    port: 9999, //本地服务端口，优先访问webpack打包目录文件
    host: getNetworkIp(), //设置局域网访问ip地址
    open: true, //自动打开页面
    compress: true, //开启gzip压缩
    hot: true, //热更新，自动更新代码
    contentBase: path.resolve(__dirname, 'multiPageDist'), //指定本地静态资源服务器的目录
    before: mockApi,
    proxy: { //设置代理（通过node本地服务发送和接收请求数据）：
      // 写法1：可以用 * 或者 / 匹配任意请求路径
      "/api": "http://baidu.com", //只要请求以“/api”开头的,都会发送到http://baidu.com
      //写法2：
      "/secondApi": {
        target: "http://baidu.com",
        //路径重写： 
        pathRewrite: {
          '^/secondApi': '' //发代理请求时，把请求路径开头的"/api"去除
        },
      }
    },
    /* //多个请求路径对应同一个代理地址
    proxy:[{
      context:["/api","/secondApi"],
      target:"http://baidu.com",
      pathRewrite:{
        '^/secondApi':''//发代理请求时，把请求路径开头的"/api"去除
      },
    }] */
  },
}
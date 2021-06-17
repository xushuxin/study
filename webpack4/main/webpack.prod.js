//单独配置生产环境的配置
const path = require("path");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); //css压缩插件
const TerserPlugin = require('terser-webpack-plugin'); //js压缩插件
module.exports = {
  mode: "production",
  // devtool: 'source-map',//生产环境一般可以不开启，如果有必要也可以开启
  optimization: {
    minimize: true, //控制是否开启压缩（development默认false，production模式下默认为true）
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true, //使用多进程运行，加快构建速度，建议开启
        sourceMap: true, // 如果production模式使用source-maps,必须开启
        terserOptions: {
          compress: {
            // drop_console:true,//删除console.*
            drop_debugger: true, //删除debugger,默认为true
            // pure_funcs:['console.log']//指定console.log函数删除不会影响代码（则无论是否被引用都会被删除），会降低压缩速度
          }
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ]
  }
}
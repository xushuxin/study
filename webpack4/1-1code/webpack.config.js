const extracss = require("extract-text-webpack-plugin");
const minicss = require("mini-css-extract-plugin");
const htmlwebpackplugin=require("html-webpack-plugin");
module.exports = {
  mode: 'development',//production压缩代码
  // entry:['./app.js','./app2.js'],
  entry: {//多入口
    app: ['./app.js'],
    app2: './app2.js'
  },
  output: {
    // filename:"./[name].[hash:4].js"//name对应entry中对应的文件名
    filename: "./[name].js"//name对应entry中对应的文件名
  },
  module: {//每个被处理的文件都是一个模块
    rules: [
      {
        test: /\.js$/, //正则，匹配处理的文件名后缀
        // use:'babel-loader'//使用的loader名(无配置的写法)
        //cnpm install @babel/core babel-loader --save
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test:/\.(png|jpg|jpeg|gif)/,
        use:[
          {
            loader:'file-loader',
            options:{
              name:"[name].[hash:4].[ext]",
              outputPath:"assets/img",
              publicPath:"sdsadmalms"
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: minicss.loader
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: '[local]'
              }
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                require("autoprefixer")(),//自动补充前缀
                require("postcss-cssnext")()//使用下一代css语法
              ]
            }
          }
        ]
        // use:extracss.extract({
        //   fallback:{
        //     loader:"style-loader"
        //   },
        //   use:[
        //     {
        //       loader:"css-loader",
        //       options:{
        //         modules:{
        //           localIdentName:'[local]'
        //         }
        //       }
        //     },
        //     {
        //       loader:"postcss-loader",
        //       options:{
        //         ident:"postcss",
        //         plugins:[
        //           require("autoprefixer")(),//自动补充前缀
        //           require("postcss-cssnext")()//使用下一代css语法
        //         ]
        //       }
        //     }
        //   ]
        // })
      }
    ]
  },
  plugins: [
    // new extracss({
    //   filename: "[name].min.css"
    // })
    new minicss({
      filename:"[name].min.css"
    }),
    new htmlwebpackplugin({
      template:"index.html",
      filename:"index.html",
      chunks:['app']
    }),
    new htmlwebpackplugin({
      template:"index.html",
      filename:"index2.html",
      chunks:["app2"]
    })
  ]
}

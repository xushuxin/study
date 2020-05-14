//webpack是node写出来的，使用node的语法
let path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
module.exports={
  devServer:{//开发服务器的配置
    port:3000,//端口
    progress:true,//打包时显示进度条
    contentBase:'./build',//指定目录作为静态服务
    compress:true,//启用gzip压缩,加快页面加载速度（将资源文件压缩成gizp格式传输，可以使文件缩小3-10倍，由浏览器解压）
    open:false//自动打开默认浏览器
  },
  mode:'development',//模式 默认两种 production development
  entry:'./src/index.js',//入口
  output:{
    filename:'bundle.[hash:8].js',//打包后的文件名；hash值会在文件修改后打包时自动改变（避免缓存）
    path:path.resolve(__dirname,'build')//路径必须是一个绝对路径
  },
  plugins:[//数组，放着所有的插件
    new HtmlWebpackPlugin({//HTML插件，以已知模板在打包后的目录生成html文件
      template:'./src/index.html',//指定要打包的模板
      filename:'index.html',//打包后生成的文件
      minify:{
        removeAttributeQuotes:true,//去除html模板双引号
        collapseWhitespace:true//折叠，去除空格
      },
      hash:true//给引入的js文件加上hash
    }),
    new MiniCssExtractPlugin({//用于将css提取到一个css文件，通过link标签加载css文件
      filename:'main.css'
    })
  ],
  module:{//模块
    rules:[//规则 css-loader 接受@import这种语法；style-loader是吧css插入到head标签中
      //loader的特点 希望单一
      //loader的用法 字符串只用一个loader
      //多个loader需要使用[]
      //[]中loader的顺序 默认从右往左执行，从上往下执行
      //loader支持对象格式
      {
        test:/\.css$/,
        use:[
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test:/\.less$/,
        use:[
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
}
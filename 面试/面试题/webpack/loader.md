##### 什么是loader？

loader 本质是一个函数，参数是上一个loader的内容或者模块的源代码，经过一些处理，把结果传给下一个loader或者webpack

使用自定义loader的三种方式：

以自定义px2rem2-loader(放在项目根目录下loaders文件夹下)为例：

①配置resolveLoader.alias

```js
//返回的是loader的绝对路径
const px2rem2LoaderPath = path.resolve(__dirname,'loaders/px2rem2-loader.js');

module.exports ={
  resolveLoader:{
    alias:{
       'px2rem2-loader':px2rem2LoaderPath
    } 
  },
}

```

②配置resolveLoader.modules，设置loaders为依赖优先查找文件夹

```js
module.exports ={
  resolveLoader:{
    modules:['loaders','node_modules']
  },
}
```

③直接将自定义loader的绝对路径传递给loader配置项

```js
//返回的是loader的绝对路径
const px2rem2LoaderPath = path.resolve(__dirname,'loaders/px2rem2-loader.js');

module.exports = {
  module:{
    rules:[
      {
        test:/\.css$/,
        // exclude:/antd\.css$/,
        use:[
          "style-loader",
          "css-loader",
          {
            loader:px2rem2LoaderPath,
            options:{remUnit:75,remPrecision:8,exclude:/antd\.css/},

          }
        ]
      },
    ]
}
```

AST解析网站：https://astexplorer.net/
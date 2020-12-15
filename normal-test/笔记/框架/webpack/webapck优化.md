### 开发效率优化

**配置resolve.alias和module.noParse可以加快构建速度**

**optimization.splitChunks和DllPlugin都可以实现分包，并且DllPlugin可以加快构建速度**

1. **如果我们每个页面都需要引入一个依赖，但是又不想自己手动引入，可以使用webpack自带的插件webpack.ProvidePlugin实现自动引入**

   webpack.config.js

   ```js
   plugins:[
     new webpack.ProvidePlugin({
       '自定义变量名':'要设置自动引入的文件的路径'
     })
   ]
   ```

   知识点：

   1.前端工程化环境是利用node进行文件读取，遵循node的导入导出机制，比如只写一个axios,会优先到node_modules目录下查找该文件夹下的index.js文件并引入

   2.遵循commonjs规范的模块，可以直接引入

   3.遵循ESModule规范的，需要指定default或者对应的导出属性，如下面的myAxios

   4.文件导出的对象的一切属性包括其原型上的属性都可以单独设置自动引入

   常用配置

   ```js
   plugins: [
     // 自动加载模块，而不必到处 import 或 require
     new webpack.ProvidePlugin({
       $: 'jquery',
       jQuery: 'jquery',
       // myAxios: 'js/axios',//1.这里可以直接使用js，是因为设置了alias;2. axios文件内必须使用commonJS规范导出，才可以这样用
       myAxios: ['js/axios', 'default'], //axios内使用ESModule规范导出，需要设置导出的属性名，默认default
       jqAjax: ['jquery', 'ajax']//jquery的静态属性也可以抽出来
     })
   ],
   ```

   

2. **resolve.extensions (webpack自带配置)**

   让webpack尝试按顺序解析配置的后缀名(引入文件时不需要写扩展名，可能会降低构建速度)

   webpack.config.js

   ```js
   resolve:{
     extensions:['.js','.vue','.json']
   }
   ```

3. **resolve.alias  设置绝对路径的别名（可以加快构建速度）**

    webpack.config.js

    ```js
    resolve:{
      alias:{
        //@vue/cli中的默认配置
        '@':path.resolve(__dirname,'src'),
        'vue$': 'vue/dist/vue.esm.js',//import Vue from "vue"会转化为在当前项目的node_modules目录下查找vue/dist/vue.esm.js
      }
    }
    ```

    知识点：

    + 绝对路径查找比相对路径查找更快

    + $符结尾的，如果指定的路径开头为./或者开头直接是文件或文件夹名，便是在node_modules下查找对应文件；如果以/开头，则直接在/后面的目录下查找对应文件

    + alias配置的别名在webpack配置文件中也可以使用

4. **resolve.modules  配置优先查找的目录（绝对路径）**

    可以指定自定义的目录，打包时优先查找该目录，查找不到再到node_modules文件夹查找:
    设置绝对路径的modules效果与alias的差不多，都可以加快构建速度

    ```js
    const path =require('path');
    module.exports={
      //...other config
    	resolve:{
        //当遇到没写相对路径文件时，优先去src中查找，没有再去node_modules中查找
      	modules:[path.resolve(__dirname,'src'),'node_modules']
    	}
    }
    ```

5. **module.noParse 让webpack不解析指定正则匹配的文件(可以加快构建速度)**

    + 忽略的文件中不应该包含任何导入机制（import,require,define以及其他的导入机制）

    ```js
    module.exports={
      //...
    	module:{
        noParse:/jquery|lodash///打包时忽略jquery和lodash，它俩都不依赖其他库
      }
    }
    ```

6. **webpack.DefinePlugin 在编译时定义一些全局常量（根据环境不同设置不同的值）**

    ```js
    const webpack = require('webpack');
    module.exports={
      plugins:[
        new webpack.DefinePlugin({
          BASE_URL:JSON.stringify('http://baidu.com'),
          'process.env.NODE_ENV':'"production"',
          OPTIONS:{
            PARAMS1:JSON.stringify(1)
          }
        })
      ]
    }
    ```

    + 编译时就会把代码中写的常量名，编译成值

    + process.env是NODE内置的一个对象，我们可以在上面添加一些自定义属性
    + 要生成数字、布尔值、对象不需要特殊处理，但是想要常量的值是字符串，需要自己多加一对引号或者使用JSON.stringify，否则会解析成变量名

    + 效果类似于

      eval('process.env.NODE_ENV="production"')

      eval('OPTIONS={PARAMS1:JSON.stringify(1)}')//获取的1是字符串

7. **thread-loader  多进程打包，用于耗时比较长的loader**

   +  @vue/cli create-reat-app都已经内置了

   + 以前使用的happypack，但是这个包已经不维护了

   + @vue/cli 会在系统的cpu有多于一个内核时自动为Babel或者TypeScript启用thread-loader，仅作用于生产构建
   
8. **webpack.IgnorePlugin 在打包时忽略指定文件**

    moment仅引入中文包的优化

    webpack.config.js

    ```js
    plugins:[
     new webpack.IgnorePlugin(/locale/, /moment/) //打包时忽略node_modules中moment目录下的使用require引入的路径包含locale的资源
    ]
    ```

    使用的地方单独引入中文包

    ```js
    import "moment/locale/zh-cn";
    ```

9. **optimization.splitChunks 分包的配置**

    + 如果我们不想使用resolve.externals排除一个包，单独使用CDN引入，也可以使用splitChunk把这个包抽离成一个单独的文件
    
      ```js
      module.exports={
        //...
        optimization:{
      		splitChunks:{
            chunks:'all',
            minSize:10000,//包最小10kb才单独拆分出来
            minChunks:1,//只要引用1次的包就可以拆分出来
            cacheGroups:{
            	lodash:{//先抽离一些模块
            		filename:'[name].[hash].js',
            		test:/lodash/,
            		chunks:'all'，
                priority: -1,
                enforce: true 
          		},
              moment:{
                filename:'[name].[hash].js',
                test:/moment/,
                chunks:'all'，
                priority: -1,
                enforce: true 
              }，
              vendors: { //抽离vendor.js
              name: 'vendors',
                chunks: 'initial',
              test: /[\\/]node_modules[\\/]/,
                priority: -2,
            	enforce: true 
              },
            common: { //最后抽离common.js
                name: 'common',
                chunks: 'initial',
                minSize: 0,
                minChunks: 2, //引用两次才抽离
                priority: -3,
                enforce: true //
              },
          	}
          }
        }
      }
      ```
      
      + **chunks**的含义是拆分模块的范围，有三个值：async、initial、all
      
      ​	async：只从异步加载的模块里面进行拆分（import()）
      
      ​	initial：只从入口模块进行拆分
      
      ​	all：表示以上两者都包括(异步和同步可以共用chunk)
      
      + **priority**  代表优先级，优先级高的先进行抽离
      
      + **enforce**  自定义分包时，最好都设置为true，强制分包(如果不设置，webpack会根据minSize, minChunks,maxAsyncRequests，maxInitialRequests 调整你的打包结果)
      + **minChunks**  抽离的包被引用指定次数次才会抽离
      + **minSize**  最小分包的大小，没有达到要求的不分包
    
10. **DllPlugin  动态链接库**  

    + 实现分包

    + 提升构建速度

    通过DLLPlugin` 和 `DLLReferencePlugin实现      

    + DLLPlugin用于单独的一个webpack配置文件，用于提前生成我们想要抽离的库

    + DllReferencePlugin用于主配置文件，通过manifest.json文件告诉webpack我们已打包的库的信息，如果manifest.json中有这个库的信息，webpack就不会再去打包这个库了

    

    以vue.js为例

    新建一个单独的webpack配置文件：

    ```js
    const path = require('path');
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    const webpack = require('webpack');
    module.exports = {
      mode: "production",
      entry: {
        vue: ['vue']//必须为数组
      },
      output: {
        filename: 'dll_[name].js',
        path: path.resolve(__dirname, 'multiPageDist'),
        library: 'dll_[name]'
      },
      plugins: [
        new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns: ['dll_*', 'mainfest.json']
        }),
        new webpack.DllPlugin({ 
          name: 'dll_[name]', //需要和上面的library保持一致
          path: path.resolve(__dirname, 'multiPageDist', 'manifest.json')//生成映射信息文件
        })
      ]
    }
    ```

    以上代码，使用DllPlugin单独打包vue.js到指定目录（一般设置webpack打包输出目录即可），生成manifest.json文件（保存相关dll库的映射信息）

    项目的webpack主配置文件：

    ```js
    plugins:[
      new webpack.DllReferencePlugin({
        //打包编译时，到manifest.json文件中查看有没有这个包的映射信息
        //如果有，直接跳过不用再打包
        //没有才去，打包对应的包
        manifest: path.resolve(__dirname, 'multiPageDist', 'manifest.json')
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["**/*", '!dll_*', '!manifest*'], //不删除动态链接库相关文件
      }),
    ]
    ```

    + 使用DllReferencePlugin检查有哪些已打包的库，直接跳过打包这些库
    + clean-webpack-plugin 指定打包时不要清除生成的dll库相关文件

    html模板文件中需要引入生成的库：

    ```html
    <body>
      <script src="./dll_vue.js"></script>
    </body>
    ```

    最后，注意点：

    + 本地使用devServer进行内存打包时，需要配置devServer.contentBase为动态链接库生成的目录，否则无法找到生成我们提前生成的库文件

    + 如果要拆分多个包 需要创建多个 webpack.DllReferencePlugin，分别指定对应的manifest文件（生成时也要生成多个）

      ##### 拆分多个包：

      dll.config.js

      ```JS
      const path = require('path');
      const { CleanWebpackPlugin } = require('clean-webpack-plugin');
      const webpack = require('webpack');
      module.exports = {
        mode: "production",
        entry: {
          vue: ['vue'], //必须是数组格式
          mathjs: ['mathjs']
        },
        output: {
          filename: 'dll_[name].js',
          path: path.resolve(__dirname, 'multiPageDist'),
          library: 'dll_[name]'
        },
        plugins: [
          new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['dll_*', '*-mainfest.json']
          }),
          new webpack.DllPlugin({ //根据对应的库名，生成对应映射文件
            name: 'dll_[name]', //需要和上面的library保持一致
            path: path.resolve(__dirname, 'multiPageDist', '[name]-manifest.json')
          })
        ]
      }
      ```

      webpack主配置文件

      ```js
      new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, 'multiPageDist', 'vue-manifest.json')
      }),
        new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, 'multiPageDist', 'mathjs-manifest.json')
      }),
        new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["**/*", '!dll_*', '!*-manifest.json'], //不删除动态链接库相关文件
      }),
      ```

      


### 性能优化

#### 文件压缩配置

**css文件压缩：**css-minimizer-webpack-plugin

**js文件压缩**：terser-webpack-plugin

​		minimize设置为true时webpack会压缩js文件，生产模式minimize默认为true，webpack会使用自己默认的minimizer工具压缩，但是如果设置了minimizer配置项，代表我们使用自己的压缩工具，则webpack就不会默认压缩js了（不管是生产环境还是测试环境，也就是说我们使用了压缩css的插件，就必须重新使用其他插件压缩js）

**删除无用的css:** npm i purgecss-webpack-plugin glob -D

**需要配合mini-css-extract-plugin使用**

```javascript
let paths = glob.sync('./src/**/\*',{nodir:true})
let PurgeCss = require('purgecss-webpack-plugin');
new PurgeCss({
   paths:paths
})
```

**图片压缩：**  image-webpack-loader

```js
use:[
  {loader:'file-loader'},
  {loader:'image-webpack-loader',options: {
    mozjpeg: {
      progressive: true,
    },
    // optipng.enabled: false will disable optipng
    optipng: {
      enabled: false,
    },
    pngquant: {
      quality: [0.65, 0.90],
      speed: 4
    },
    gifsicle: {
      interlaced: false,
    },
    // the webp option will enable WEBP
    webp: {
      quality: 75
    }
  }}
]
```



#### 抽离文件，通过CDN方式引入

**externals  外部扩展，不打包指定模块，而是代码运行时从环境中获取**

外部引用可以是CDN，或者是相对路径的一个文件

例如：不需要下载相关依赖，直接在模板中通过CDN方式引入即可

webpack.config.js

```js
module.exports={
  externals:{
		'自定义属性名':'包生成的全局变量'
	}
}
```

代码中可以引用方式：

```
import xxx from '自定义属性名'
```



#### gzip压缩

一般服务器都会进行gzip压缩，并且会开启gzip文件的传输支持

当然也可以前端打包时进行gzip压缩：

1. 安装compression-webpack-plugin

   https://www.npmjs.com/package/compression-webpack-plugin

2. 常用配置

   ```js
   new CompressionPlugin({
     filename: "[path][base].gz",
     algorithm: "gzip",
     test: /\.(js|css)$/,
     threshold: 10240,//10k以上开启压缩
     minRatio: 0.8,//压缩后文件变为原来的80%以下才进行压缩
     deleteOriginalAssets: false,//是否删除原始资源
   }),
   ```

   注意：前端gzip压缩，只是生成了gz扩展名的文件，必须服务器开启gzip文件传输支持，才会加载我们压缩好的gz文件（或者服务器自己压缩，前端不用动）

   本地测试可以在打包输出目录下，通过http-server -g 开启支持gzip的本地服务器
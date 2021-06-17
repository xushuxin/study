学习笔记
#### 自定义loader的编写
##### 三种使用自定义loader的配置方式
创建一个loader目录存放所有的自定义loader
以自定义px2rem2-loader为例：
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

##### 编写loader
1. 创建一个px2rem2-loader.js文件，引入处理源码的模块
```js
let Px2rem = require('./px2rem');
```
2. 引入loaderUtils模块，loaderUtils是webapck的一个模块，可以用来获取loader配置的参数对象
```js
let loaderUtils = require('loader-utils');
```
3. 创建loader函数
```js
    function loader(source,ast){
        //...
    }
    module.export = loader
```
4. 调用loaderUtils.getOptions方法，获取loader配置的参数对象
```js
    function loader(source,ast){
        //this是loader上下文对象，保存着loader的所有信息
       let options = loaderUtils.getOptions(this);
    }
    module.export = loader
```
5. 根据用户配置的exclude正则与当前正在转换的模块路径进行对比，排除掉不需要处理的模块
```js
    function loader(source,ast){
       let options = loaderUtils.getOptions(this);
       //this.resource 当前正在转换的模块的绝对路径
       if(options.exclude && options.exclude.test(this.resource)){
           return source;
       }

    }
    module.export = loader
```

6. 调用实际处理的模块的的接口，传入源代码，返回处理后的代码
```js
function loader(source,ast){
    let options = loaderUtils.getOptions(this);
    if(options.exclude && options.exclude.test(this.resource)){
        return source;
    }

    let px2rem = new Px2rem(options) ;

    let targetResource = px2rem.generateRem(source);

    return targetResource;
}
module.export = loader

```


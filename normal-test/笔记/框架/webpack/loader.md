#### loader的原理和实现

1. 设置loader的默认配置 lib/webpack.js

2. 解析loader模块路径 node_modules

3. 根据rule.modules创建RulesSer规则集

4. 使用loader-runner运行loader

**解析webpack中loader的方式**

```js
1.直接把编写的loader放在node_modules下
2.resolveLoader.alias 给loader设置别名
3.resolveLoader.modules 设置查找loader的优先级，先查找node_modules，再查找我们指定的文件夹(最常用)
```

**loader.pitch**

1. 优先级高于loader函数，会先执行

2. pitch执行的顺序与loader执行顺序相反

3. pitch可以中断loader的执行（有返回值的时候）

   ![loader1](/Users/xushuxin/Desktop/5期框架课件/webpack最后一天课件/loaders/loader1.png)

   ![loader1](/Users/xushuxin/Desktop/5期框架课件/webpack最后一天课件/loaders/loader2.png)

**loader的类型**

pre(前置)  / normal(普通，不设置的默认值) /  inline(行内,在文件内使用) / post(后置)

loader的执行顺序：pre => normal => inline => post

loader.pitch执行的顺序：post=>inline=>normal=>pre

可以通过配置项enforce设置loader的类型，不设置则默认为normal

inline loader的使用:

```js
//引入a.js使用inline-loader（会加载其他的loader按顺序处理）
require("inline-loader!./a");

//!!:只使用inline-loader处理a.js
require("!!inline-loader!./a");

//-!:不要执行当前inline-loader前面的loader(pre,normal)
require("-!inline-loader!./a");

//!:不执行normal loader
require("!inline-loader!./a");			
```

**实现简单的style-loader和less-loader**

style-loader

```js
function loader(source) {
  //1.先创建style标签;2.把样式作为style的内容;3.把style标签插入到head
  let code = `
    let style = document.createElement("style");
    style.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(style);
  `;
  return code;
}
module.exports = loader;
```

less-loader

npm i less -D

```js
let less = require("less");//需要下载less
function loader(source) {
  let css;
  //less的程序化处理
  less.render(source, (err, result) => {
    css = result.css;
  });
  return css;
}
module.exports = loader;
```

**实现babel-loader**

npm i @babel/core @babel/preset-env -D

webapck.config.js配置项

```js
{
  test: /\.js$/,
    use: {
      loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
     },
}
```

自己写的babel-loader.js

```js
const babel = require("@babel/core");
const loaderUtils = require("loader-utils"); //专门用来处理loader的options的工具包
//1.转换es6代码时通过babel.transform进行转换;
//2.并且还需要把options下的@babel/preset-env预设参数传进去
function loader(source) {
  // this是一个loaderContext对象 传进来的options参数都是放在this.query下
  // console.log(this.query);
  const options = loaderUtils.getOptions(this);
  console.log(this.resourcePath);
  let cb = this.async(); //会把load变成一个异步的loader,并且返回一个异步的回调
  babel.transform(
    source,
    {
      ...options,
      sourceMap: true,
      sourceFileName: this.resourcePath, //对应的sourceMap文件的名字
    },
    function (err, result) {
      cb(err, result.code, result.map); //code表示结果；map指source-map，产生源码的映射
    }
  );
  return source;
}
module.exports = loader;
```












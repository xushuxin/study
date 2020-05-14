##webpack 安装
-安装本地的webpack
-webpack webpack-cli -D
##webpack可以进行0配置
-打包工具 ->输出打包后的结果(js模块)
-打包 (支持js模块化)
##手动配置webpack
-默认配置文件的名字： webpack.config.js

设置webpack配置文件：npx webpack --config webpack.config.my.js
一般可以再package.json文件中配置script参数
npm run build -- --config webpack.config.my.js  这里用--可以在已配置的脚本后添加参数“--config webpack.config.my.js”

-------------------------------------------------------------------------------------------------------------

1.webpack基本配置
2.插件配置
html-webpack-plugin作用：以已知模板在打包后的目录生成html文件
mini-css-extract-plugin作用：用于将css提取到一个css文件，通过link标签加载css文件
3.样式处理插件配置(css,less,sass,)
  loader的特点： 作用单一
  loader的用法： 只用一个loader使用字符串，多个loader需要使用[]
  loader的执行顺序：[]中loader的顺序 默认从右往左执行
  loader也可以写成对象形式
  两种配置方式（例）：
  {test:/\.css$/,use:[{loader:'style-loader',options:{}},{loader:'css-loader'}]}
  {test:/\.css$/,use:['style-loader','css-loader']}
  css-loader作用： 支持@import这种语法
  style-loader作用：把css插入到head标签中
  less-loader: 解析less文件，转为css语法
  stylus-loader:解析styl文件，转为css语法
  sass-loader:解析sass文件，转为css语法



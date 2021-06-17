1. #### webpack-dev-server的原理？

   使用node的http模块启动服务，fs模块读取文件

2. #### loader和plugin的区别

   loader 本质是一个函数，参数是上一个loader的内容或者模块的源代码，经过一些处理，把结果传给下一个loader或者webpack

   ![image-20210424211527190](/Users/xushuxin/Library/Application Support/typora-user-images/image-20210424211527190.png)

   ![image-20210424211912896](/Users/xushuxin/Library/Application Support/typora-user-images/image-20210424211912896.png)
   plugin比较强大，可以提供一些额外的功能，并且plugin也可以实现loader的功能
   
3. #### loader的类型有哪些

   pre / normal /inline / post四种

   执行顺序 pre=>normal=>inline=>post

4. #### loader中的this指向谁？

   loaderContext对象，存放着loader的相关配置信息

5. #### webpack你都做过哪些方面的优化？

```js
1-利用externals提取第三方依赖并用CDN引入

2-利用splitChunks提取公共js代码和分割js代码

3-使用 DllPlugin 和 DllReferencePlugin分离出不需要更新变动的包

4-使用require.context批量注册全局组件

5-使用ProvidePlugin自动导入模块

6-resolve.modules和resolve.alias设置绝对路径别名，减小文件搜索范围

7-利用image-webpack-loader进行压缩图片

8-thread-loader多进程打包

9-使用@babel/plugin-transform-runtime解决语法转换时生成重复冗余代码的问题

10-resolve.noParse，减少不必要的解析

11-动态导入的方式，减小首次加载包的体积

12-开启GZIP压缩

```
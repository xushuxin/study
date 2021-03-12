##### script/build.js 

##### **vue使用[rollup](https://www.rollupjs.com/guide/introduction)（使用ES6模块化标准）进行打包**

**入口文件：src/core/instance/init.js**

**带模板编译时的一些处理：src/platforms/web/entry-runtime-with-compiler.js** 

**compileToFunctions将template和el转为render函数方法：src/platforms/web/compiler/index.js**

**源码中绝对路径的别名设置：scripts/alias.js**

**defineReactive方法位置： src/core/observer/index.js**

**patch方法：src/core/vdom/patch.js**



**Vue的入口文件：src/core/instance/index.js**

**nextTick代码：src/core/util/next-tick.js**


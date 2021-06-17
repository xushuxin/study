要做好一个 Vue CLI 插件，除了要了解 Vue CLI 插件的开发规范之外，我们还需要了解几个 npm 包：
+ chalk 让你的控制台输出好看一点，为文字或背景上色
+ glob 让你可以使用 Shell 脚本的方式匹配文件
+ inquirer 让你可以使用交互式的命令行来获取需要的信息

项目包含部分：
─ README.md
─ generator.js  # Generator（可选）
─ index.js      # Service 插件
─ package.json
─ prompts.js    # Prompt 文件（可选）
─ ui.js         # Vue UI 集成（可选）

主要分为 4 个部分：Generator 、Service、Prompt、UI。
其中，Service 是必须的，其他的部分都是可选项。
先来讲一下各个部分的作用：
##### Generator

Generator 可以为你的项目创建文件、编辑文件、添加依赖。
**Generator 应该放在根目录下，被命名为 generator.js 或者放在 generator 目录下，被命名为 index.js，它会在调用 vue add 或者 vue invoke 时被执行。**

##### Service

Service 可以为你的项目修改 Webpack 配置、创建 vue-cli-service 命令、修改 vue-cli-service 命令。
Service 应该放在根目录下，被命名为 index.js，它会在调用 vue-cli-service 时被执行。


##### 本地调试
下载本地的插件包
```shell
npm install /Users/xushuxin/Desktop/program/study/normal-test/脚手架工具/vue-cli-plugin-generator-code
```
安装已下载的插件
```shell
vue invoke vue-cli-plugin-generator-code
```

[Vue-CLI插件开发文档](https://cli.vuejs.org/zh/dev-guide/plugin-dev.html#%E5%BC%80%E5%A7%8B)

参考项目地址：https://github.com/wjq990112/vue-cli-plugin-generators
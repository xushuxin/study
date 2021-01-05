在当前项目目录新建文件夹vue-press

在vue-press目录下新建文件夹docs

在docs目录下新建文件夹.vuepress

在.vuepress目录下新建config.js 、enhanceApp.js、以及components文件夹

进入vue-press目录后,初始化项目

```js
npm init -y
npm install vuepress -D
```

在 `package.json` 中添加一些 scripts

```json
"scripts": {
  "docs:dev": "vuepress dev docs",
  "docs:build": "vuepress build docs"
}
```

docs目录下添加README.md文件

初始化配置config.js

下载相关依赖

```js
npm install element-ui highlight.js node-sass sass-loader core-js@2 --save
```

初始化enhanceApp.js

.vuepress目录下新建styles目录styles目录下添加palette.styl文件，覆盖默认样式



具体的的样式待完善。。。



#### 发布npm包

##### package.json

配置打包命令

```json
"scripts": {
    "lib":"vue-cli-service build --target lib --name my-ui ./src/packages/index.js"
  },
```

配置运行入口

```json
"main":"./dist/my-ui.umd.min.js"
```

打包

```
npm run lib 
```

项目根目录添加.npmignore文件，设置不需要发布的文件和目录，比如：

```.npmignore
vue-press
tests
src
public
```

修改包名和版本号

private改为false

npm publish

如发现报错源不正确，可能是本地使用的淘宝镜像资源，使用

```js
nrm ls //查看本地使用的源
```

切换源

```js
nrm use npm //切换源到npm
```

 如发现发布失败，可能是没有登录npm,解决:

```js
npm adduser
```

注意发布的包名不要和别人一样
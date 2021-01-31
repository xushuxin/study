##### 创建工程

```shell
mkdir vue-auto-router-cli
cd vue-auto-router-cli
npm init -y
npm i commander download-git-repo ora handlebars figlet clear chalk open watch -s
```

新建bin目录，新建kkb.js

```js
#!/usr/bin/env node
指定一个解释器，我们希望当前文件当做命令行来执行，我们需要告诉shell使用node解释器来运行
```

在package.json中配置bin脚本

```json
{
	"bin":{
		"kkb":"./bin/kkb.js"
	}
}
```

在命令行中输入

```shell
npm link
建立一个链接，把当前包链接到全局（约等于在全局安装了这个包）
```

引入commander库，用于定义命令

```js
const program = require("commander");
program.version(require('../package.json').version);//设置版本为package.json中的version
program
		.command('init <name>')//定义一个命令
		.description('init project  ')//命令的描述
		.action(name => {//执行这个命令后，做什么
  		console.log('init ' + name)
		})
program.parse(process.argv);//根据主进程的参数来解析，必须写，不写什么都出不来
```

这时，命令行输入

```shell
kkb     #会提示可用的命令
kkb -V  #查看包的版本
kkb init myVue #使用上面定义的命令
```

新建lib目录，init.js文件

```js
const {promisify} = require('util');//用于把node的回调式调用转为promise式调用
const figlet = promisify(require('figlet'));//用于生成大字

const clear =require('clear');//清屏
const chalk =require('chalk');//粉笔，用于生成指定颜色的子

//打印函数
const log = content => console.log(chalk.green(content))

//导出函数
module.exports = async name =>{
  //打印欢迎界面
  clear()
  const data = await figlet('KKB WELCOME');
  log(data)
}
```

修改bin/kkb.js中的action

```js
program
    .command('init <name>')
    .description('init project  ')
    .action(require('../lib/init.js'))
```

lib目录下新建download.js

```js
const {promisify} = require('util');

//导出clone方法用于下载 repo：仓库地址，desc:本地项目文件夹名
module.exports.clone = async function(repo,desc){
  const download = promisify(require('download-git-repo'));//用于下载git仓库
  const ora = require('ora');//用于生成进度条
  const process = ora(`下载.....${repo}`);//生成进度条
  process.start();//进度条开始转
  await download(repo,desc);//下载git仓库
  process.succeed();//下载成功
}
```

lib/init.js 引入clone，并调用

```js
const {promisify} = require('util');//用于把node的回调式调用转为promise
const figlet = promisify(require('figlet'));//用于生成大字

const clear =require('clear');//清屏
const chalk =require('chalk');//粉笔，用于生成指定颜色的子

//1
const {clone} = require('./download.js');//引入封装的下载仓库的方法

//打印函数
const log = content => console.log(chalk.green(content))

module.exports = async name =>{
  //打印欢迎界面
  clear()
  const data = await figlet('KKB WELCOME');
  log(data)
	
  //2
  log(`🚀创建项目：${name}`)
  clone('github:su37josephxia/vue-sample',name);
}
```

命令行执行

```shell
kkb init myVue
```

会出现出现下载进度的画面，

下载完成之后，会发现当前目录下多了一个myVue文件夹

##### 实现自动安装依赖

```js
//使用promise管理spawn
//spawn是用于把子进程的日志的字节流和主进程相对接（这样我们的命令行才能显示信息）
const spawn = async (...args) =>{
	const {spawn} = require('child_process');
  return new Promise(resolve=>{
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on('close',()=>{
      resolve();
    })
  })
}
```

lib/init.js 使用封装的spawn方法，自动下载依赖

```js
module.exports = async name =>{
  //打印欢迎界面
  clear()
  const data = await figlet('KKB WELCOME');
  log(data)

  log(`🚀创建项目：${name}`)
  await clone('github:su37josephxia/vue-template',name);//等待下载完成

  //自动下载依赖
  log(`🔨安装依赖`)
  //参数说明：
  //第一个参数：命令，如npm/cnpm
  //第二个参数：参数(数组)
  //第三个参数：对象，cwd指定运行命令行的目录
  await spawn('npm',['install'],{cwd:`./${name}`})// => cnpm install
  log(`
  👌安装完成：
  To get Start:
  =======================
    cd ${name}
    npm run serve 
  =======================
  `)
```

实现自动启动项目并在浏览器打开

lib/init.js

```js
const open =require('open');
//打开浏览器
open(`http://localhost:8080`);
//启动项目
await spawn('npm',['run','serve'],{cwd:`./${name}`});
```

##### 实现约定路由功能（根据新建的文件名去生成对应的菜单和路由文件）

1. lib目录新建refresh.js

```js
const fs = require('fs');//读写文件
const handlebars =require('handlebars');//模板引擎，用于编译

module.exports = async ()=>{
  //获取列表
  const list = fs.readdirSync('./src/views')//读取views目录下所有文件
    .filter(v=>v!=='Home.vue')//过滤掉Home.vue
    .map(v=>({
      //去除文件后缀，并转小写
      name:v.replace('.vue','').toLowerCase(),//路由名称
      file:v//文件名称，用于路由配置文件中查找文件
    }))
  //根据router.js.hbs模板生成路由配置文件router.js
  compile({list},'./src/router.js','./template/router.js.hbs');
  //根据模板App.vue.hbs生成App.vue文件（包含首页菜单）
  compile({list},'./src/App.vue','./template/App.vue.hbs');
  
  /**
   * 模板编译
   * @param {传递给模板引擎的参数} meta 
   * @param {目标文件路径} filePath 
   * @param {模板文件路径} templatePath 
   */
  function compile(meta,filePath,templatePath){
    if(fs.existsSync(templatePath)){
      //读取模板内容
      const content = fs.readFileSync(templatePath).toString();
      //使用handlebars模板引擎进行编译；柯里化函数，先传模板内容再传参数
      const result = handlebars.compile(content)(meta);
      //把编译结果写入到指定文件 （整体覆盖）
      fs.writeFileSync(filePath,result);
      console.log(`🚀${filePath} 创建成功！`);
    }
  }
}
```

2.项目目录下新建文件夹template（使用handlebars作为模板引擎）

新建模板文件router.js.hbs作为router.js的模板

```js
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    //这里是handlebars的语法，根据传递的列表循环生成内容
    {{#each list}}
    {
      path: '/{{name}}',
      name: '{{name}}',
      component: () => import('./views/{{file}}')
    },
    {{/each}}
  ]
})
```

新建模板文件App.vue.hbs作为App.vue的模板

```vue
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> 
      <!--这里是菜单，同样也需要根据传递给模板引擎的数据循环生成-->
      {{#each list}}
      | <router-link to="/{{name}}">{{name}}</router-link>
      {{/each}}
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

3. 在bin目录kkb.js添加一个命令

```js
program.command('refresh')//定义一个刷新路由配置文件和菜单的命令
        .description('refresh router & menu')
        .action(require('../lib/refresh.js'))    
```

4. 测试，进入项目目录

   npm run serve

   kkb refresh
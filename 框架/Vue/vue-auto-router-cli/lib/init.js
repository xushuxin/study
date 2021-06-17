const {promisify} = require('util');//用于把node的回调式调用转为promise
const figlet = promisify(require('figlet'));//用于生成大字

const clear =require('clear');//清屏
const chalk =require('chalk');//粉笔，用于生成指定颜色的字

const {clone} = require('./download.js');//引入封装的下载仓库的方法

const open =require('open');//用于打开浏览器

//使用promise管理spawn
//spawn是用于把子进程的日志的字节流和主进程相对接（这样我们的命令行才能显示信息）
const spawn = async (...args) =>{
	const {spawn} = require('child_process');//引入子进程，系统内置
  return new Promise(resolve=>{
    const proc = spawn(...args);//启动子进程完成任务
    proc.stdout.pipe(process.stdout);//传递打印日志
    proc.stderr.pipe(process.stderr);//传递错误日志
    proc.on('close',()=>{//子进程关闭时触发（成功）
      resolve();
    })
  })
}

//打印函数
const log = content => console.log(chalk.green(content))

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
  
  //打开浏览器
  open(`http://localhost:8080`);
  
  //启动项目
  await spawn('npm',['run','serve'],{cwd:`./${name}`});
 
  
}
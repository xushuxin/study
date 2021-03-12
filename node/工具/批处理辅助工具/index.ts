
/**
 * 约定参数：
 * cmd：用于设置命令行语句
 * config：用于指定命令行语句配置文件
 */
const util = require("util");//node内置的工具包
const path = require("path");//node内置的工具包
const {getParams} = require('./utils');//自己的工具
const childProcess = require('child_process');//子进程（node中都是用子进程来处理任务的）
const exec = util.promisify(childProcess.exec); // 这里把exec promisify，exec执行返回一个promise

async function execute(cmd: string): Promise<string> {
    console.log('执行"' + cmd + '"命令...');
    const {stdout,stderr } = await exec(cmd);//执行指定的命令, 返回的stdout：命令执行的返回结果，stderr：报错信息
    console.log('success!');
    console.log(stdout);
    return stdout;
}

//传入一个包含多个命令字符串的数组，依次执行
async function mulExec(command: string[]) {
    for (const cmd of command) {
        await execute(cmd);
    }
}

const args = getParams();
//获取命令行参数中的cmd属性的值（-cmd=后面到单词边界之间的内容）
if(args.cmd){
    mulExec((args.cmd as string).split(','));
}


//通过读取配置文件的方式执行多个命令
if(args.config){
    //process.cwd()获取当前Node.js进程的当前工作目录
    let configPath = path.resolve(process.cwd(),args.config)+'--'

    try{
        const config = require(configPath);
        mulExec(config.command);
    }catch(error){
        console.error('加载配置文件出错\r\n','工作目录：'+process.cwd(),"\r\n设置文件的地址:"+configPath)
    }
}

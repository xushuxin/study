/* 
console.log('process.argv',process.argv);
//node 1.js --port 3000
//=> ['启动Node.js进程的可执行文件的绝对路径','正在被执行的JavaScript文件的绝对路径','--port','3000']
//后面用空格隔开的参数都会当做单个元素按书写顺序放到数组中
let reg =/^--(\w+)/;
process.argv.forEach((item,index)=>{
  if(reg.test(item)){//检查当前参数是否为--开头
    console.log(`${reg.exec(item)[1]}的值应该设置为${process.argv[index+1]}`);//获取--*后面的一个参数
  }
})
 */
//第三方模块commander，专门用于解析命令行参数（process.argv）
//可以使用链式写法
const program = require('commander');

program.option(`--port <value>`,'set your port');//运行node 1.js --help，会出现这里设置的Options提示信息
program.option(`--port1 <value>`,'set your port1');
program.option(`--port2 <value>`,'set your port2');
program.option(`--port3 <value>`,'set your port3');

//运行node 1.js --help，Usage提示信息由以下两部分主城
program.usage('学习node的使用')//设置一些关于当前包用途的信息
        .name('hello node');//设置包名

let obj = program.parse(process.argv);//解析命令行参数
console.log(obj)
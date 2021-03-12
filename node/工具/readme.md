> process.argv
+ 一个存储命令行参数的数组
+ 比如`node util.js -var=1 -var=666`
    获得到的数组为
    `[
        '/usr/local/bin/node',
        '/Users/xushuxin/Desktop/program/study/node/工具/批处理辅助工具/util.js',
        '-var1=1',
        '-var2=666'
    ]`
+ 第一个在js中一般都会是node执行程序的地址
+ 第二个参数使用node，一般是要执行的文件地址
+ 后面就是传递的参数了

> 子进程child_process
+ node中都是用子进程来处理任务的
+ `childProcess.exec`用来执行命令
    ```js
    const {exec} = require('child_process');
    ```
+ 可引入node内置`util`包的`promisify`方法来将`childProcss.exec`转为promise形式链式调用
    ```js
    const { promisify } =require('util');
    const pExec = promisify(exec);//promise调用方式的执行方法
    ```
+ `childProcss.exec('命令');` 执行指定的命令
    返回的结果是一个对象（promise的值），包含属性：
    stdout：命令执行的返回结果，
    stderr：报错信息

> 多个命令串行`exec`
    
+ 可获取命令行用分割符（如：逗号）分割为数组，循环执行，`async/await`保证依次执行
+ 也可通过读取配置文件，依次执行
    - 使用命令行参数`-config`来指定配置文件地址（相对于当前脚本文件的路径或者是绝对路径）
    - 配置文件中按cjs规范导出命令行字符串数组（数组中的命令存放顺序即为实际执行顺序）
    - process.cwd()获取当前Node.js进程的当前工作目录，与执行的配置文件相对地址，path.resolve拼接成完整路径，最后引入执行

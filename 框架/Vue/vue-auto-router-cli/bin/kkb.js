#!/usr/bin/env node
const program = require("commander");
program.version(require('../package.json').version);//设置版本为package.json中的version

program
		.command('init <name>')//定义一个命令(初始化项目)
		.description('init project  ')//命令的描述
    .action(require('../lib/init.js'))

program.command('refresh')//定义一个刷新路由配置文件和菜单的命令
        .description('refresh router & menu')
        .action(require('../lib/refresh.js'))    

        
program.parse(process.argv);//根据主进程的参数来解析，必须写，不写什么都出不来
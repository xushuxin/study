

全局安装

```
npm install -g pm2
```

初始化配置文件ecosystem.config.js 

```js
pm2 init
```

可以修改配置文件名称，比如pm2.config.js,通过配置文件启动：

```js
pm2 start pm2.config.js
```

配置说明：

```js
{
  "apps": [{
    "name": "test",  //名称
    "script": "server.js", //程序入口
    "cwd": "./",           //根目录
    "instances": 1,
    "error_file":"./logs/error.log",//错误输出日志
    "out_file":"./logs/out.log",  //日志
    "log_date_format":"YYYY-MM-DD HH:mm Z" //日期格式
  }]
}
```

#####  常用配置项说明:

`apps`： json结构，apps是一个数组，每一个数组成员就是对应一个pm2中运行的应用；

`name`：应用程序名称；

`cwd`：应用程序所在的目录；

`script`：应用程序的入口文件路径；

`log_date_format`： 指定日志日期格式，如YYYY-MM-DD HH：mm：ss；

`error_file`：自定义应用程序的错误日志文件，代码错误可在此文件查找；

`out_file`：自定义应用程序日志文件，如应用打印大量的标准输出，会导致pm2日志过大；

`pid_file`：自定义应用程序的pid文件；

`interpreter`：指定的脚本解释器；

`interpreter_args`：传递给解释器的参数；

`instances`： 应用启动实例个数，仅在cluster模式有效，默认为fork；

`min_uptime`：最小运行时间，这里设置的是60s即如果应用程序在60s内退出，pm2会认为程序异常退出，此时触发重启max_restarts设置数量；

`max_restarts`：设置应用程序异常退出重启的次数，默认15次（从0开始计数）；

`autorestart` ：默认为true, 发生异常的情况下自动重启；

`cron_restart`：定时启动，解决重启能解决的问题；

`max_memory_restart`：最大内存限制数，超出自动重启；

`watch`：是否启用监控模式，默认是false。如果设置成true，当应用程序变动时，pm2会自动重载。这里也可以设置你要监控的文件。

`ignore_watch`：忽略监听的文件夹，支持正则表达式；

`merge_logs`： 设置追加日志而不是新建日志；

`exec_interpreter`：应用程序的脚本类型，默认是nodejs；

`exec_mode`：应用程序启动模式，支持fork和cluster模式，默认是fork；

`vizion`：启用/禁用vizion特性(版本控制)；

`env`：环境变量，object类型；

`force`：默认false，如果true，可以重复启动一个脚本。pm2不建议这么做；

`restart_delay`：异常重启情况下，延时重启时间；

命令行参数列表：

```js
--watch：监听应用目录的变化，一旦发生变化，自动重启。如果要精确监听、不见听的目录，最好通过配置文件。
-i --instances：启用多少个实例，可用于负载均衡。如果-i 0或者-i max，则根据当前机器核数确定实例数目。
--ignore-watch：排除监听的目录/文件，可以是特定的文件名，也可以是正则。比如--ignore-watch="test node_modules "some scripts""
-n --name：应用的名称。查看应用信息的时候可以用到。
-o --output <path>：标准输出日志文件的路径。
-e --error <path>：错误输出日志文件的路径。
--interpreter <interpreter>：the interpreter pm2 should use for executing app (bash, python...)。比如你用的coffee script来编写应用。
```

启动

```js
pm2 start app.js --watch -i 2
```

重启

```js
pm2 restart app.js
```

停止

停止特定的应用。可以先通过`pm2 list`获取应用的名字（--name指定的）或者进程id。

```js
pm2 list
pm2 stop app_name|app_id
```

如果要停止所有应用，可以

```js
pm2 stop all
```

删除

```js
pm2 delete app_name|app_id
pm2 delete all
```



```js
$ pm2 start app.js -i max 根据有效CPU数目启动最大进程数目
$ pm2 start app.js -i 3 启动3个进程
$ pm2 start app.js -x 用fork模式启动 app.js 而不是使用 cluster
$ pm2 start app.js -x -- -a 23 用fork模式启动 app.js 并且传递参数 (-a 23)
$ pm2 start app.js --name serverone 启动一个进程并把它命名为 serverone
$ pm2 stop serverone 停止 serverone 进程
$ pm2 start app.json 启动进程, 在 app.json里设置选项
$ pm2 start app.js -i max -- -a 23 在--之后给 app.js 传递参数
$ pm2 start app.js -i max -e err.log -o out.log 启动 并 生成一个配置文件
```


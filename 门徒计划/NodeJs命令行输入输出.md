命令行输入输出

```js
const readline = require("readline");

// 开启命令行交互模式
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//读取命令行输入
rl.on("line", (line) => {
  console.log("接收到" + line);

  //向命令行输出
  rl.write("向process.stdout写入的数据");
});
```

问题交互

```js
rl.question("你如何看待 Node.js 中文网？", (answer) => {
  // TODO：将答案记录在数据库中。
  console.log(`感谢您的宝贵意见：${answer}`);

  //关闭交互模式
  rl.close();
});
```

Demo

```js
/**
 * 输入：
 * 8 3
 * 1 3 -1 -3 5 3 6 7
 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let lineCount = 0;

let n, k, data;
rl.on("line", (line) => {
  lineCount += 1;
  if (lineCount === 1) {
    let arr = line.split(" ");
    (n = arr[0]), (k = arr[1]);
  }

  if (lineCount === 2) {
    data = line.split(" ");
    doComputed(n, k, data, rl); //根据获取到的数据进行处理
    rl.close(); //关闭输入输出，触发close事件
  }
}).on("close", () => {
  rl.write("\n");
  process.exit(0); //以成功状态结束程序
});

function doComputed(n, k, data, rl) {
  //在这里进行逻辑处理，并使用rl.write向控制台输出
}
```

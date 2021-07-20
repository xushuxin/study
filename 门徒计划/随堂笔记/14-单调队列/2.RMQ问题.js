
//双生序列：http://oj.haizeix.com/problem/372
/*
样例输入
5
3 1 5 2 4
5 2 4 3 1

样例输出
4
*/
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let lineCount = 0;

let n, a, b;
rl.on('line', (line) => {
    lineCount += 1;
    if (lineCount === 1) {
        n = line;
    }
    if (lineCount === 2) {
        a = line.split(' ').map(s => +s);
    }
    if (lineCount === 3) {
        b = line.split(' ').map(s => +s)
        doComputed(n, a, b, rl);//根据获取到的数据进行处理
        rl.close();//关闭输入输出，触发close事件
    }
}).on('close', () => {
    rl.write('\n');
    process.exit(0);//以成功状态结束程序
});


function doComputed(n, a, b) {
    let q1 = [], q2 = [];
    let p;
    for (p = 0; p < n; p++) {
        while (q1.length && a[p] < q1[q1.length - 1]) q1.pop();
        while (q2.length && b[p] < q2[q2.length - 1]) q2.pop();
        q1.push(p);
        q2.push(p);
        if (q1.length !== q2.length) break;
    }
    console.log(p)
}
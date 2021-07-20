// 滑动窗口：http://oj.haizeix.com/problem/271
/**
 * 输入：
 * 8 3
   1 3 -1 -3 5 3 6 7
   输出：
   -1 -3 -3 -3 3 3
   3 3 5 5 6 7 
*/
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let lineCount = 0;

let n, k, data;
rl.on('line', (line) => {
    lineCount += 1;
    if (lineCount === 1) {
        let arr = line.split(' ');
        n = arr[0], k = arr[1];
    }

    if (lineCount === 2) {
        data = line.split(' ');
        doComputed(n, k, data, rl);//根据获取到的数据进行处理
        rl.close();//关闭输入输出，触发close事件
    }
}).on('close', () => {
    rl.write('\n');
    process.exit(0);//以成功状态结束程序
});


function doComputed(n, k, data, rl) {
    let q = [];
    // 维护单调递增队列
    for (let i = 0; i < n; i++) {
        /** 1.入队（分为两步） */
        while (q.length && +data[q[q.length - 1]] > +data[i]) q.pop();//1.1删除队列中所有比当前值大的元素（维护单调性）

        q.push(i);//1.2加入队列（存储的是元素的索引）

        /** 2.出队 */
        if (i - q[0] === k) q.shift();//队首元素超出区间范围。将其出队

        if (i + 1 < k) continue;//当处理的元素还没有达到k个时，不输出

        if (i + 1 > k) rl.write(' ');//每两个输出的数之间用空格隔开
        rl.write(data[q[0]]);//向控制台输出队首元素
    }

    rl.write('\n');

    q = [];//清空队列

    // 维护单调递减队列
    for (let i = 0; i < n; i++) {
        /** 1.入队（分为两步） */
        while (q.length && +data[q[q.length - 1]] < +data[i]) q.pop();//1.1删除队列中所有比当前值大的元素（维护单调性）

        q.push(i);//1.2加入队列（存储的是元素的索引）

        /** 2.出队 */
        if (i - q[0] === k) q.shift();//队首元素超出区间范围。将其出队

        if (i + 1 < k) continue;//当处理的元素还没有达到k个时，不输出

        if (i + 1 > k) rl.write(' ');//每两个输出的数之间用空格隔开
        rl.write(data[q[0]]);//向控制台输出队首元素
    }
}
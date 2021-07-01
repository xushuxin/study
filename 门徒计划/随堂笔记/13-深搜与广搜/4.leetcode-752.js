/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
class Data {
    constructor(str, step) {
        this.str = str;
        this.step = step;
    }
}
var getStr = function (str, i, j) {
    let arr = str.split('');
    switch (j) {
        case 0:
            arr[i] = (+arr[i] + 1 + 10) % 10; break;
        case 1:
            arr[i] = (+arr[i] - 1 + 10) % 10; break;
    }
    return arr.join('')
}
var openLock = function (deadends, target) {
    let store = new Set(deadends);//4.防重复及限制条件
    if (store.has("0000")) return -1;
    //1. 初始化队列  
    let que = [];
    que.push(new Data("0000", 0));

    while (que.length) {
        //2. 取出元素进行状态判断
        let cur = que.shift();
        if (cur.str === target) {
            return cur.step;
        }
        // 3. 在上一个状态基础上扩展出其他的可能状态
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 2; j++) {
                let str = getStr(cur.str, i, j);
                if (store.has(str)) continue;//不能放入队列的跳过
                store.add(str);
                que.push(new Data(str, cur.step + 1));
            }
        }
    }
    return -1;
};
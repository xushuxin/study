/**
 * Definition for Employee.
 * function Employee(id, importance, subordinates) {
 *     this.id = id;
 *     this.importance = importance;
 *     this.subordinates = subordinates;
 * }
 */

/**
 * @param {Employee[]} employees
 * @param {number} id
 * @return {number}
 */
//2. 哈希表 + 广搜
var GetImportance = function (employees, id) {
    let map = new Map(), target;
    for (let i = 0; i < employees.length; i++) {
        let x = employees[i];
        if (x.id === id) target = x;
        map.set(x.id, x);
    }
    let que = [], total = 0;
    target && que.push(target);
    while (que.length) {
        let cur = que.shift();
        total += cur.importance;
        let subs = cur.subordinates;
        for (let i = 0; i < subs.length; i++) {
            que.push(map.get(subs[i]));
        }
    }
    return total;
};
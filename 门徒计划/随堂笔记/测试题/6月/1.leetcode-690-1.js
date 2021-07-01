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
//1. 哈希表 + 深搜
var GetImportance = function (employees, id) {
    let map = new Map();
    for (let i = 0; i < employees.length; i++) {
        let x = employees[i];
        map.set(x.id, x);
    }
    function dfs(id) {
        let total = 0;
        let x = map.get(id);
        if (id === x.id) {
            total += x.importance
            for (let j = 0; j < x.subordinates.length; j++) {
                total += dfs(x.subordinates[j]);
            }
        }
        return total;
    }
    return dfs(id);
};
//  广搜
var canReach = function (arr, start) {
    let que = [[start, arr[start]]], direct = [+1, -1], vis = new Set();
    while (que.length) {
        let cur = que.shift();
        if (cur[1] === 0) return true;
        for (let x of direct) {
            let indx = cur[0] + x * cur[1]
            //边界条件判断
            if (indx < 0 || indx >= arr.length) continue;
            if (vis.has(indx)) continue;
            vis.add(indx);
            que.push([indx, arr[indx]])
        }
    }
    return false;
};
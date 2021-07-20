// 哈希表
var getFolderNames = function (names) {
    let h = new Map(), ans = [];
    for (var i = 0; i < names.length; i++) {
        let x = names[i];
        while (h.has(x)) {
            x = names[i] + `(${h.get(names[i])})`;
            h.set(names[i], h.get(names[i]) + 1)
        }
        ans.push(x);
        h.set(x, 1);
    }
    return ans;
};
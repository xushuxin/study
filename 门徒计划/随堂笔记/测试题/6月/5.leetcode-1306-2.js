//  深搜
var canReach = function (arr, start, visit = new Set()) {
    if (start < 0 || start >= arr.length) return false;
    if (visit.has(start)) return false;
    visit.add(start);
    let cur = arr[start];
    if (cur === 0) return true;
    return canReach(arr, start + cur, visit) || canReach(arr, start - cur, visit);
};
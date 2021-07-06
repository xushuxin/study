function _slice(arr, i = 0, j){
    j = ( j == undefined || j > arr.length) ? arr.length : j;
    let ret = []   
    for(;i < j;i++){
        ret.push(arr[i]);
    }
    return ret;
}
// test
var arr = [1,2,3,4,6,7,8]
let arr1 = _slice(arr, 0, 7);
console.log(arr1)
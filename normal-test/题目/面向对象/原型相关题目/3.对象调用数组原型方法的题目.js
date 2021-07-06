Array.prototype.push = function (value) {
    this[this.length] = value;
}
let arr = [10, 20];
arr.push(30);
console.log(arr)

let obj = {
    2: 3,
    3: 4,
    length: 2,
    push: Array.prototype.push
}
obj.push(1);
obj.push(2);
console.log(obj);//{2:1,3:2,length:4,push:function(){}}
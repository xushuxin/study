
function _create(proto){
    let Fn = function(){};
    Fn.prototype = proto;
    return new Fn;
}
// test
let b = {
    age:18
};
let a = _create(b)
console.log(a.__proto__)
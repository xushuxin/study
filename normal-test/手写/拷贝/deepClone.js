function deepClone(obj){
    const set = new Set;//使用set维护一个已克隆对象的集合，每次克隆之前校验是否已经克隆过，克隆过就不再克隆
    function _isObj(obj){
        return typeof obj === 'object' && obj !== null
    }
    function _deepClone(obj){
        if(!_isObj(obj)) return obj;
        if(set.has(obj)) return obj;
        set.add(obj)
        let newObj;
        if(Array.isArray(obj)){
            newObj = [];
            obj.forEach(item => {
                newObj.push(_isObj(item) ? _deepClone(item):item);
            })
        }else{
            newObj = {};
            for(let key in  obj){
                if(!obj.hasOwnProperty(key)) break;
                let item = obj[key];
                newObj[key] =  _deepClone(item);
            }  
        }
        return newObj;
    }
   return _deepClone(obj)
}



// test 
var obj = {name: '哈哈'};
var a = { b: obj};
obj.a = a;
let newObj = deepClone(obj);
console.log(newObj)
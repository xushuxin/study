function shadowClone(obj){
    if(typeof obj !== 'object' || obj === null) return;
    let newObj;
    if(Array.isArray(obj)){
        newObj = [];
        obj.forEach(item=>{
            newObj.push(item);
        })
    }else{
        newObj = {};
        for(let key in  obj){
            newObj[key] = obj[key];
        }  
    }
    return newObj;
}

// test
let obj = {
age:{
    val:18
}, 
name: '哈哈'};
// let obj = [1,2,3];
let newObj = shadowClone(obj);
console.log(newObj.age === obj.age);
console.log(newObj === obj);
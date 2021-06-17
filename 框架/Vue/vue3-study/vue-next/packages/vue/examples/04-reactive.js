function isObject(obj){
  return obj!==null && typeof obj === 'object';
}
function reactive(obj){
  if(!isObject(obj)){
    return obj;
  }
  return new Proxy(obj,{
    get(target,key){
      console.log('get',key);
      let res = Reflect.get(target,key);
      // return res
      //对象则递归处理
      return isObject(res)?reactive(res):res;
    },
    set(target,key,val){
      console.log('set',key);
      return Reflect.set(target,key,val)
    },
    deleteProperty(target,key){
      console.log('deleteProperty',key);
      // delete target[key];
      Reflect.deleteProperty(target,key)
    }
  })
}
const obj =reactive({
  foo:'foo',
  a:{
    b:'66'
  }
});
// console.log(obj.foo);
// obj.foo ='fooooo';
// console.log(obj)
// delete obj.foo;
// console.log(obj);

// obj.a.b;
obj.a.b = 1111;
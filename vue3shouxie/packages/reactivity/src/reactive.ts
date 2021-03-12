const mutableHandlers = function(){};
const shallowReactiveHandlers = function(){};
const readonlyHandlers = function(){};
const shallowReadonlyHandlers = function(){};
export function reactive(){
  createReactiveObject(target,false,mutableHandlers)
}
export function shallowReactive(){
  createReactiveObject(target,false,shallowReactiveHandlers)
}

export function readonly(target){
  createReactiveObject(target,true,readonlyHandlers)
}
export function shallowReadonly(){
  createReactiveObject(target,true,shallowReadonlyHandlers)
}


//是不是进度 是不是深度  柯里化
//new Proxy 最核心的需要拦截，数据的读取和数据的修改
const reactiveMap = new WeakMap();//会自动垃圾回收，不会内存泄漏，存储的key只能是对象
const readonlyMap = new WeakMap();
export function createReactiveObject(target,isReadonly,baseHandler){
  if(!isObject(target)) return target;

  //如果某个对象已经被代理过了，就不用再代理了
}
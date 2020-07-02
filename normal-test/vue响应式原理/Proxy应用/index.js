//控制变量的属性设置必须按照自定义规则
function createValidator(target,validator){
  return new Proxy(target,{
    _validator:validator,
    set(target,key,value,proxy){
      if(target.hasOwnProperty(key)){
        var validatorFn=this._validator[key];
        if(validatorFn(value)){
          // target[key]=value;//普通设置属性方式
          return Reflect.set(target,key,value,proxy);//设置Proxy的新值的一种方式
        }else{
          throw Error('type error')
        }

      }else{
        throw Error('no this property')
      }
    }
  })
}
var personVali={
  name(val){
    return typeof val==='string'
  },
  age(val){
    return typeof val==='number'
  }
}

class Person{
  constructor(name,age){
    this.name=name;
    this.age=age;
    return createValidator(this,personVali)
  }
}
var xiaoming=new Person('小明',30)
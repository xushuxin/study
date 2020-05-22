var ob={
  a:1,
  b:2
};
//创建代理对象,并覆盖原对象
ob=new Proxy(ob,{
  get :function(target,key,receive){
    console.log(target,key,receive)
    return target[key];
  },
  //target：对象本身，key：访问的属性，newValue：设置的新值，recieve :Proxy对象
  set:function(target,key,newValue,receive){
    console.log(target,key,newValue,receive)
    target[key]=newValue;
  }
})
ob.a;
ob.b=1;
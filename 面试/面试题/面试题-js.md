#### 一、在组件的通信中 EventBus 非常经典，你能手写实现下 EventBus 么？

```js
class EventBus{
  constructor(){
    this.pool = {};
  }
  on(event,fn){
    if(Object.hasOwnProperty(event)){
      	if(this.pool[event].includes(fn)) return;//防重复添加
        this.pool[event] = [].concat(this.pool[event],fn)
    }else{
       this.pool[event] = fn;
    } 
  }
  emit(event,...params){
    if(!this.pool[event]) return;
    if(typeof this.pool[event] === 'function'){
      this.pool[event](...params);
    }else{
      this.pool[event].forEach(item=>{
        item(...params);
      })
    }
  }
  off(event, fn){
    if(!this.pool[event]) return;
    //没有传具体函数，或者只存了一个函数，直接删除
    if(!fn || typeof this.pool[event] === 'function'){
     	 delete this.pool[event]; 
    }else{//存了一个数组，并且传递了具体的要删除的函数地址，删除对应的函数
      for(let i = 0;i<this.pool[event].length;i++){
        if(item === fn){
          this.pool[event].splice(i,1);
          break;
        }
      }
    }
   
  }
}
```

#### 二、请介绍一下装饰者模式，并实现？

什么是装饰者模式？其实很简单，在传统的面向对象语言中，给对象添加功能常常使用继承的方式，但是继承的方式并不灵活，还会带来许多问题三、了解js中设计模式吗？动手实现一下单例模式？

一方面会导致超类和子类之间存在强耦合性，当超类改变时，子类也会随之改变；另一方面，继承这种功能复用方式通常被称为“白箱复用”，“白箱”是相对可见性而言的，在继承方式中，超类的内部细节是对子类可见的，继承常常被认为破坏了封装性。

使用继承还会带来另外一个问题，在完成一些功能复用的同时，有可能创建出大量的子类，使子类的数量呈爆炸性增长。

装饰者模式能够在不改变对象自身的基础上，在程序运行期间给对象动态地添加职责。跟继承相比，装饰者是一种更轻便灵活的做法，这是一种“即用即付”的方式，比如天冷了就多穿一件外套，需要飞行时就在头上插一支竹蜻蜓，遇到一堆食尸鬼时就点开AOE（范围攻击）技能。

比如说现在我要去做写一个游戏，里面有个英雄，叫鲁班，然后我要去写它的技能：

```js
class luban{
  fire(){
    console.log('这里是基础伤害')
  }
}
```

所以我们会写个class，里面有一个发射的方法，只负责基础伤害
然后当鲁班到1级的时候，会解锁第一技能，所以这时候需要对鲁班进行增强，但是如果用继承的方式的话，那么子类会比较多，这时候就可以用到装饰者了：

```js
class luban{
  fire(){
    console.log('这里是基础伤害')
  }
}

class firstKill{
  constructor(luban){
    this.luban = luban
  }
  
  fire(){
    this.luban.fire();
    console.log('发射手雷')
  }
}

let luban1 = new luban;
		luban1 = new firstKill(luban1);//重写鲁班对象
		luban1.fire();//这里是基础伤害 发射手雷
```

在 firstSkill 这个类里，我直接传进去一个对象，然后实现了一个一模一样的 fire 方法，于是乎，我们就可以这么去使用了

现在看上去还是创建了一个对象 luban1，但是注意，luban1被赋值了两次，第二次是 new 的 firstSkill，并且把前面 new 出来的 luban1 传进去了，所以最后 luban1 在调用 fire 方法的时候，会同时具有基础伤害以及第一技能。

这样子，我们就用了一个装饰者 firstSkill 来增强 luban，并且不是用继承，而且也不会破坏原来的 luban

然后装饰者模式还有一种写法是这样的：

```js
let luban = {
  fire:function(){
    console.log('这里是基础伤害')
  }
}
let firstSkill = function(){
  console.log('发射手雷')
}

let fire1 = luban.fire;

luban.fire = function(){//重写luban的fire方法，加入新的逻辑
  fire1();
  firstSkill();
}

luban.fire();
```

来个实际点的案例吧，比较常见的应用场景比如说 window.onload

在我们开发大一点的项目的时候，我们不确定 window.onload 方法别人有没有使用过，而且我们需要在 onload 的时候，做一些事情，又不想覆盖原有的 onload 事件怎么办呢？

```js
window.onload = function(){
	console.log('这是别人的onload逻辑')
}

let onload = window.onload;

window.onload  = function(){
  onload();
  console.log('新增的业务逻辑')
}
```

还可以封装一个给函数添加前置函数的方法：

```js
function addBefore(originFn,fn){
  return function(...args){
    fn.call(this,[...args]);
    return originFn.call(this,[...args])
  }
}

window.onload = function(){
	console.log('这是别人的onload逻辑')
}

window.onload = addBefore(window.onload,()=>{
 console.log('前置的一些逻辑')
})
```



#### 题目三：了解js中设计模式吗？动手实现一下单例模式？

单利模式核心思想：

限制类实例化次数只能一次，一个类只有一个实例，并提供一个访问它的全局访问点。

实现方式：
使用一个变量存储类实例对象（值初始为 `null/undefined` ）。进行类实例化时，判断类实例对象是否存在，存在则返回该实例，不存在则创建类实例后返回。多次调用类生成实例方法，返回同一个实例对象。

首先用一个自执行函数来创建了一个闭包环境，这样的话我们可以有一个开关来判断这个实例是不是已经存在了，并且还不会污染全局变量。

首先用开关来判断 类是否已经实例化，如果已经实例化过了，那么直接关闭开关，不允许再次实例化就可以了

```js
let createSingle = (function(){
  let instance;
  return function(name){
    if(instance) return instance;
    return instance = new Single(name)
  }
})();
function Single(name){
  this.name = name;
}
let a = createSingle('haha');
let b = createSingle('bbb');
console.log(b.name);// 'haha'
```



可以看到虽然实例化了两次，但是后面这一次实例化得到的对象还是之前第一次实例化的对象，所以得到的名字还是 lili

这样我们就实现单例模式了。
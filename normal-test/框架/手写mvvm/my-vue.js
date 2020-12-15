(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ?
    module.exports = factory() :
    typeof define === "function" && define.amd ?
    define(factory) :
    (global = global || self, global.Vue = factory());
})(this, function factory() {
  /**
   * 思路：1.Vue本身是一个类,传递一个对象,el代表元素的选择器，data是我们定义的数据
   * 2.实现data的数据劫持（递归）
   */
  //定义Vue类
  function Vue(options) {
    this.$el = document.querySelector(options.el); //通过el查找元素
    this.$data = options.data;
    observe(this.$data);
    //监听所有属性后把所有的节点转移到文档片段上
    nodeToFragment(this.$el, this);
  }
  var vm = new Vue({
    el: '#app',
    data: {
      name: '哈哈哈'
    }
  });
  //对data中的每一项进行数据劫持
  function observe(data) {
    if ({}.toString.call(data) !== "[object Object]") return;
    Object.entries(data).forEach(([key, value]) => {
      defineReactive(data, key, value);
    });
  }
  //数据劫持的主要逻辑
  function defineReactive(data, key, value) {
    observe(value); //递归劫持
    var dep = new Dep();
    Object.defineProperty(data, key, {
      get() {
        console.log("get");
        if (Dep.target) { //如果当前有观察者实例被创建，则把它添加到订阅池中
          dep.addSub(Dep.target);
        }
        return value;
      },
      set(val) {
        console.log("set");
        if (val !== value) {
          value = val; //形成了闭包，所以上级上下文中的value变量保存下来了，可以重复使用
          dep.notify(); //通知当前属性的所有观察者执行更新操作
        }

      },
    });
  }
  //节点转移到文档片段，先移除，解析语法后，再添加到页面
  function nodeToFragment(el, vm) {
    let fragment = document.createDocumentFragment();
    let child;
    while (child = el.firstChild) {
      fragment.appendChild(child);
      compile(child, vm); //编译模板
    }
    el.appendChild(fragment);
  }

  //编译节点中vue语法
  function compile(node, vm) {
    //node.nodeType：1元素节点 3文本节点 8注释节点 9根节点
    if (node.nodeType === 1) {
      //如果是元素节点，获取其所有属性
      [...node.attributes].forEach(item => {
        console.dir(item);
        let { name, value } = item; //属性名、属性值(对应data中的属性名)
        if (/^v-model$/.test(name)) { //v-model属性
          new Watcher(node, value, vm);
          node.value = vm.$data[value];
          //监听输入框输出事件，同步data中的数据
          node.addEventListener('input', function(e) {
            vm.$data[value] = e.target.value;
          })
        }
      });

      //处理当前节点的子元素
      [...node.childNodes].forEach(item => {
        compile(item, vm);
      });

    } else { //文本节点
      let str = node.textContent;
      node.originTextContent = str; //自己写的，存储原本的模板，后续更新视图时使用
      let reg = /\{\{\s?(\w+)\s?\}\}/g;
      if (!reg.test(str)) return; //如果没有{{}}这种语法直接不作处理
      //把{{}}语法转换为对应的data中的属性值
      str = str.replace(reg, function(...[, $1]) {
        new Watcher(node, $1, vm);
        return vm.$data[$1]; //获取到属性的对应的值返回
      });
      node.textContent = str;
    }
  }

  //订阅器
  class Dep {
    constructor() {
      this.subs = []; //创建订阅池
    }
    addSub(sub) { //负责把观察者添加到订阅池中
      this.subs.push(sub);
    }
    notify() { //负责通知所有观察者更新
      this.subs.forEach(sub => {
        sub.update();
      })
    }
  }

  //创建一个观察者类（在编译模板获取data中的值的时候创建其实例）
  class Watcher {
    constructor(node, key, vm) {
      Dep.target = this; //存储当前观察者实例
      this.node = node;
      this.key = key;
      this.vm = vm;
      this.getValue(); //获取当前观察的属性的属性值，触发该属性的get函数执行
      Dep.target = null; //在get函数中把当前观察者实例添加到订阅池中后，防止重复添加，要把Dep.target置空
    }

    //负责更新DOM
    update() {
      this.getValue(); //获取最新的值

      if (this.node.nodeType === 1) { //元素节点
        //只考虑input框
        this.node.value = this.value;
      } else {
        let str = this.node.originTextContent;
        let reg = /\{\{\s?(\w+)\s?\}\}/g;
        if (!reg.test(str)) return; //如果没有{{}}这种语法直接不作处理
        //把{{}}语法转换为对应的data中的属性值
        str = str.replace(reg, function(...[, $1]) {
          return vm.$data[$1]; //获取到属性的对应的值返回
        });
        this.node.textContent = str;
      }
    }
    getValue() {
      this.value = this.vm.$data[this.key]; //会触发key属性的get函数
    }
  }
  return Vue;
});
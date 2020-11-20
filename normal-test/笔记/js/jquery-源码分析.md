**工厂设计模式**

```js
var jQuery = funtion(selector,context){
  return new jQuery.fn.init(selector,context);
}
//这里是给jQuery函数上添加了一个属性fn，指向jQuery的原型，并且重写了jQuery的原型(批量添加方法)
jQuery.fn = jQuery.prototype ={
  
};


vat init = jQuery.fn.init = function(selector,context,root){
  
};
init.prototype = jQuery.fn;
window.jQuery = window.$ = jQuery;
```

让外部可以使用函数方式调用：jQuery() 或者$()

我们平时（如果不需要自己给原型定义名称，以及给原型添加方法）可以这样用

```js
var Fn = function(params){
  return new Fn.prototype.init(params);
};
Fn.prototype.init = function(params){
  //this指向Fn()创建的实例
};
Fn.prototype.init.prototype = Fn.prototype;
```

**根据jQuery调用时传递的参数进行初始化**

```js
    var rootjQuery;

		init = jQuery.fn.init = function (selector, context, root) {
			var match, elem;

			// 处理: $(""), $(null), $(undefined), $(false)
			if (!selector) {
				return this;
			}

			// 支持传入 rootjQuery （jQuery.sub）
			root = root || rootjQuery;

			// 处理：传入的HTML或者字符串
			if (typeof selector === "string") {
				
      // 处理: $(DOMElement)
			} else if (selector.nodeType) {
				this[0] = selector;
				this.length = 1;
				return this;
				// 处理: $(function)
				// Shortcut for document ready
			} else if (isFunction(selector)) {
				return root.ready !== undefined ?
					root.ready(selector) :

					// Execute immediately if ready is not present
					selector(jQuery);
			}
			
      //创建jQ对象类型的类数组返回
			return jQuery.makeArray(selector, this);
		};
	// 初始化中心参考，当前文档根节点创建的jQuery实例
	rootjQuery = jQuery(document);
```

12行：初始化rootJQuery,我们正常调用jQuery使用的root默认是这个，也是一个jQuery实例，也支持使用传入的rootJQuery作为root

19行：如果传入的第一个参数是一个原生DOM对象，把原生DOM对象转化为jQuery对象，这样就可以使用jQuery原型上定义的方法了       

扩展：把jQuery对象转化为原生DOM对象的方法（调用浏览器内置的属性和方法）：jQueryObj[0]或者jQueryObj.get(i)

jQueryObj.eq(i)是在jQueryObj的集合中获取对应的索引项，返回的仍然是jQuery对象                  

24~30行：如果传入的第一个参数是函数，检查root.ready方法是否存在,存在则把函数放到ready的回调中（ready方法的原理是监听DOMContentLoaded事件，绑定指定回调函数）,所以我们使用$(function(){})完全等价于$().ready(function(){})

33行：对于不是字符串（html/id）、原生DOM对象、函数的selector，会把selector包装成一个JQ实例类数组返回

makeArray细节处理：

```js
var arr = [],
		push = arr.push；
makeArray: function (arr, results) {
  var ret = results || [];//结果是一个指定的值或者数组
	//如果第一个参数不为null/undefined
  if (arr != null) {
    //判断是否为类数组（字符串也算）
    if (isArrayLike(Object(arr))) {
      //否则把类数组与初始化的数组合并，如果是字符串，会先放到数组中再合并
      jQuery.merge(ret,typeof arr === "string" ? [arr] : arr);
    } else {
      //否则直接push到数组中
      push.call(ret, arr);
    }
  }

  return ret;
}
```

merge分析：

```js

```

15行，传入的如果是字符串的处理：

```js
if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {

  // 假设 以<开头，>结尾就是HTML字符串，跳过正则校验
  match = [null, selector, null];

} else {
  match = rquickExpr.exec(selector);
}

// Match html or make sure no context is specified for #id
if (match && (match[1] || !context)) {

  // HANDLE: $(html) -> $(array)
  if (match[1]) {
    context = context instanceof jQuery ? context[0] : context;

    // Option to run scripts is true for back-compat
    // Intentionally let the error be thrown if parseHTML is not present
    jQuery.merge(this, jQuery.parseHTML(
      match[1],
      context && context.nodeType ? context.ownerDocument || context : document,
      true
    ));

    // HANDLE: $(html, props)
    if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
      for (match in context) {

        // Properties of context are called as methods if possible
        if (isFunction(this[match])) {
          this[match](context[match]);

          // ...and otherwise set as attributes
        } else {
          this.attr(match, context[match]);
        }
      }
    }

    return this;

    // HANDLE: $(#id)
  } else {
    elem = document.getElementById(match[2]);

    if (elem) {

      // Inject the element directly into the jQuery object
      this[0] = elem;
      this.length = 1;
    }
    return this;
  }

  // HANDLE: $(expr, $(...))
} else if (!context || context.jquery) {
  return (context || root).find(selector);

  // HANDLE: $(expr, context)
  // (which is just equivalent to: $(context).find(expr)
} else {
  return this.constructor(context).find(selector);
}
```





**jQuery原型上扩展的方法**

```js
var arr = [];
var slice = arr.slice;
var version ='3.5.1';
jQuery.fn = jQuery.prototype ={
  jquery：version,
  constructor: jQuery,
	length: 0,//默认长度0
  get: function (num) {
    // 如果num不传，返回包含所有的原生DOM对象的数组
    if (num == null) {
      return slice.call(this);
    }

    // 如果传了num，返回jQuery类数组集合中对应索引项的原生DOM对象，支持负数索引
    return num < 0 ? this[num + this.length] : this[num];
  },
	eq: function (i) {
    var len = this.length,
        j = +i + (i < 0 ? len : 0);
    return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
  },
  pushStack: function (elems) {

    var ret = jQuery.merge(this.constructor(), elems);

    ret.prevObject = this;

    return ret;
  }
};
```

get：根据索引从JQ对象类数组集合中找到对应项「原生DOM对象」

​		 支持负数索引，不传参数返回包含所有DOM对象的数组,索引超出范围返回undefined

eq：基于索引从JQ对象类数组集合中找到对应项「依然JQ对象类数组」

​         支持负数索引，不传参数返回空的JQ对象类数组,,索引超出范围也返回空JQ对象类数组

pushStack：把传入的数组和一个空的JQ实例合并在一起，结果是包含数组所有项的JQ实例，并且prevObject属性保存了原始的JQ实例，可以用于对指定元素进行DOM操作后，重新获取原始JQ实例

支持负数索引的处理方案：

1. num < 0 ? arr[num + arr.length] : this[num]
2. +i + ( i<0 ? arr.length : 0)
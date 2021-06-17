#### JS中this的五种情况

+ 元素的事件绑定，事件触发，方法执行，方法中的this一般都是当前元素
+ 函数执行，看前面是否有”点“,有”点“则”点“前面的是谁，this就是谁，没有”点“则this是window，严格模式下是undefined，匿名函数和回调函数中的this，一般都是window
+ 构造函数中的this是当前类的实例
+ 箭头函数中没有this,this是上下文中的
+ 通过call、apply、bind强制修改this的指向
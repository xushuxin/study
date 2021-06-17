

#### 开始

首先修改package.json文件script配置，加上sourcemap，这样我们才能在断点的时候看到源码：

修改前：

```json
"scripts": {
	"dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev",
}
```

修改后：

```json
"scripts": {
	"dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev",
}
```

在example目录下新建一个文件夹存放自己的测试demo：

![image-20210423134237328](/Users/xushuxin/Library/Application Support/typora-user-images/image-20210423134237328.png)

demo内容：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
    <!-- development环境,在内存中打包的，并没有生成真实目录和文件 -->
    <script src="../../dist/vue.js"></script>
    <script>
        let vue = new Vue({
            el:'#app',
            data:{

            }
        })
    </script>
</body>
</html>
```

这样我们就可以在demo中写案例，并且在源码中断点调试啦  > - <

#### 代码

##### Vue的入口文件：src/core/instance/index.js

##### patch方法创建：src/platforms/web/runtime/patch.js

+ 通过createPatchFunction方法创建
+ createPatchFunction实际的逻辑在：core/vdom/patch.js

##### patch方法注册：src/platforms/web/runtime/index.js

![image-20210423130835961](/Users/xushuxin/Library/Application Support/typora-user-images/image-20210423130835961.png)

##### Vue实例调用`__patch__`方法：src/core/instance/lifecycle.js

![image-20210423131252202](/Users/xushuxin/Library/Application Support/typora-user-images/image-20210423131252202.png)

+ _update方法在初始化Vue类时，通过调用lifecycleMixin注入到Vue.prototype上

+ Vue实例的_update方法调用时，会调用`__patch__`方法

  初始化时

  更新时：传入的当前的vnode和修改之前的vnode，返回更新后的vnode，赋值给vm.$el（$el是初始化Vue实例时传入的，是响应式数据）

  

+ Vue实例的_update方法会在： updateComponent方法中被调用（src/core/instance/lifecycle.js）

+ updateComponent会被当做创建renderWatcher实例的参数传入，并且在创建renderWatcher时调用

+ renderWatcher在mountComponent方法（src/core/instance/lifecycle.js）被调用时创建
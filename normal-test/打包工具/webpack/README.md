学习笔记
#### webpack原理
假设有两个js模块，这里我们先假设这两个模块是符合commomjs标准的es5模块。
我们的目的是将这两个模块打包为一个能在浏览器端运行的文件，叫bundle.js。
```js
// index.js
var add = require('./add.js').default
console.log(add(1 , 2))

// add.js
exports.default = function(a,b) {return a + b}
```
假设在浏览器中直接执行这个程序肯定会有问题 最主要的问题是浏览器中没有exports对象与require方法所以一定会报错。

我们需要模拟exports对象和require方法

1. 模拟exports对象

    + 在打包的时候我们会使用nodejs的fs.readfileSync()来读取js文件，这样可以得到js文件的内容的字符串
    + 而如果需要将字符串中的代码运行会有两个方法分别是new Function与Eval，在这里面我们选用执行效率较高的eval
    ```js
    var exports = {}
    (function (exports, code) {
    eval(code)
    })(exports, 'exports.default = function(a,b){return a + b}');
    ```
2. 模拟require函数
    + require函数的功能比较简单，就是根据提供的file名称加载对应的模块。
    + 将所有模块整理成一个文件名和代码字符串的key-value表，就可以根据传入的文件名加载不同的模块了
    ```js
    (function(map){
        function require(file) {
            var exports = {};
            (function (exports, code) {
                eval(code)
            })(exports, map[file])
            return exports
        }
        require('./index.js');
    })(
        {
            './index.js':`
                var add = require('add.js').default 
                console.log(add(1 , 2))
            `,
            './add.js':`exports.default = function(a,b){return a + b}`,
        }
    )
   
    ```
3. 真正webpack生成的bundle.js文件中还需要增加模块间的依赖关系，叫做依赖图（Dependency Graph）
    类似于：
    ```js
    {
    "./src/index.js": {
        "deps": { "./add.js": "./src/add.js" },
        "code": "....."
    },
    "./src/add.js": {
        "deps": {},
        "code": "......"
    }
    }
    ```
4. 由于大多数前端程序都习惯使用es6语法所以还需要预先将es6语法转换为es5语法。

总结一下思路，webpack打包可以分为以下三个步骤：
1. 分析依赖
2. ES6转ES5
3. 替换exports和require

#### 功能实现
我们的目标是将以下两个个互相依赖的ES6Module打包为一个可以在浏览器中运行的一个JS文件(bundle.js)
+ 处理模块化
+ 多模块合并打包 - 优化网络请求

/src/add.js
```js
export default (a, b) => a + b 
```

/src/index.js
```js
import add from "./add.js";
console.log(add(1 , 2))
```
1. 分析模块

    分析模块分为以下三个步骤：
    模块的分析相当于对读取的文件代码字符串进行解析。这一步其实和高级语言的编译过程一致。需要将模块解析为抽象语法树AST。我们借助babel/parser来完成。

    > AST （Abstract Syntax Tree）抽象语法树 在计算机科学中，或简称语法树（Syntax tree），是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。（ astexplorer.net/）

    安装相关依赖
    ```shell
    yarn add @babel/parser @babel/traverse @babel/core @babel/preset-env
    ```
    新建webpack.js
    ```js
    const fs = require("fs");
    const path = require("path");
    const parser = require("@babel/parser");
    const traverse = require("@babel/traverse").default;
    const babel = require("@babel/core");

    function getModuleInfo(file) {
        // 读取文件
        const body = fs.readFileSync(file, "utf-8");

        // 转化AST语法树
        const ast = parser.parse(body, {
            sourceType: "module", //表示我们要解析的是ES模块
        });

        // 依赖收集
        const deps = {};
        traverse(ast, {
            ImportDeclaration({ node }) {
                const dirname = path.dirname(file);
                const abspath = "./" + path.join(dirname, node.source.value);
                deps[node.source.value] = abspath;
            },
        });

        // ES6转成ES5
        const { code } = babel.transformFromAst(ast, null, {
            presets: ["@babel/preset-env"],
        });
        const moduleInfo = { file, deps, code };
        return moduleInfo;
    }
    const info = getModuleInfo("./src/index.js");
    console.log("info:", info);
    ```

2. 收集依赖

    上一步开发的函数可以单独解析某一个模块，这一步我们需要开发一个函数从入口模块开始根据依赖关系进行递归解析。最后将依赖关系构成为依赖图（Dependency Graph）
    ```js
    /**
     * 模块解析
     * @param {*} file 
     * @returns 
     */
    function parseModules(file) {
        const entry = getModuleInfo(file);
        const temp = [entry];
        const depsGraph = {};

        getDeps(temp, entry);

        temp.forEach((moduleInfo) => {
            depsGraph[moduleInfo.file] = {
                deps: moduleInfo.deps,
                code: moduleInfo.code,
            };
        });
        return depsGraph;
    }

    /**
     * 获取依赖
     * @param {*} temp 
     * @param {*} param1 
     */
    function getDeps(temp, { deps }) {
        Object.keys(deps).forEach((key) => {
            const child = getModuleInfo(deps[key]);
            temp.push(child);
            getDeps(temp, child);
        });
    }
    ```

3. 生成bundle文件
    这一步我们需要将刚才编写的执行函数和依赖图合成起来输出最后的打包文件。
    ```js
    function bundle(file) {
        const depsGraph = JSON.stringify(parseModules(file));
        return `(function (graph) {
                    function require(file) {
                        function absRequire(relPath) {
                            return require(graph[file].deps[relPath])
                        }
                        var exports = {};
                        (function (require,exports,code) {
                            eval(code)
                        })(absRequire,exports,graph[file].code)
                        return exports
                    }
                    require('${file}')
                })(${depsGraph})`;
    }

    let content = bundle('./src/index.js')
    !fs.existsSync("./dist") && fs.mkdirSync("./dist");
    fs.writeFileSync("./dist/bundle.js", content);
    ```
    最后可以编写一个简单的测试程序测试一下结果。
    ```html
    <script src="./dist/bundle.js"></script>
    ```

Babel将esModule转为commonJs的处理：
```js
// 1.export的处理
// 给exports对象添加一个__esModule属性,值为true（用于导入时区分）
Object.defineProperty(exports, "__esModule", { 
    value: true 
}); 
// 清除原有的exports的default属性
exports["default"] = void 0;
// =================================================
// 转化前：export default (a, b) => a - b;
// 转化后：
var _default = function _default(a, b) {
    return a - b;      
};
exports["default"] = _default;
// =================================================
// 转化前：export var minus =  (a, b) => a - b;
// 转化后：
var minus = function minus(a, b) {
    return a - b;      
};
exports.minus = minus;
// =================================================

// 2.import的处理

// 转化前：
import minus from './minus.js';//直接import的，会默认读取其default属性替换使用的地方
minus(1,2); 

// 转化后:
var _minus = _interopRequireDefault(require("./minus.js"));
function _interopRequireDefault(obj) { 
    // __esModule在babel将export语法转为exports语法时被设置为true
    // esModule都处理成导入一个对象:{default:'',add:''}（即使是对象解构语法）
    return obj && obj.__esModule ? obj : { "default": obj };
}
_minus.default(1, 2);//通过成员访问的方式，默认读取default属性值作为导入的值

// 转化前：
import {minus}  from  "./minus.js";//通过解构方式import的，会读取其导入名称对应的属性替换使用的地方
minus(1,2); 
// 转化后:
_minus.minus(1, 2);
```

参考链接:https://mp.weixin.qq.com/s/i6_fIcLDeDFmvZJj8NYrVg
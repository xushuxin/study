#### 框架与库的区别

**框架**定义了一套语法规则，用户根据语法书写代码，框架会按照规则解析编译成原生的语法

**库**是内部封装了一套方法，用户可以按照库定义的接口直接调用这些方法



#### vue中使用了scoped，父子组件怎么共享样式？

父组件本来只可以修改子组件最外层的样式，使用vue-loader提供的 /deep/ 组合器可以修改组件内部的样式



#### vue中使用了scoped，怎么给body设置样式？

通过动态添加移除类名的方式，beforeCreate钩子函数中给body添加类名，设置样式，destroyed的时候移除类名



#### v-show和v-if的区别

**v-show**：只是css的显示和隐藏

**v-if**：是元素的添加和移除

v-if有更高的切换开销，而v-show有更高的初始渲染开销；

因此，如果需要非常频繁地切换，使用v-show比较好，如果运行时条件很少改变，则使用v-if比较好。



#### 为什么v-for和v-if不建议一起使用

v-for的优先级高于v-if，这样每一项都需要做v-if判断，会造成性能浪费

代替方案：使用computed属性，返回一个过滤后的数组

好处：

- 过滤后的列表*只*会在数组发生相关变化时才被重新运算，过滤更高效。
- 使用 计算属性之后，我们在渲染的时候*只*遍历需要渲染的元素，渲染更高效。
- 解耦渲染层的逻辑，可维护性更强。



#### Vue视图不更新问题

**对象：**

1. $set设置对象或者数组的属性值
2. 添加对象属性后，使用$forceUpdate() 触发视图更新
3. 添加对象属性后，浅拷贝重新赋值给原来保存对象的属性

**数组：**

多一个：手动调用数组的splice方法触发视图更新（$set内部也是这么做的）

#### Vue中的修饰符

**事件修饰符**

**.prevent 阻止事件的默认行为**

**.stop 阻止事件冒泡**

**.capture 添加事件监听器时使用事件捕获模式（即内部元素触发的事件先在此处理，然后再交由内部元素进行处理）**

**.once 事件只会触发一次**

**.native 为组件的根元素绑定原生事件**

**.sync 自定义事件和$emit的语法糖**

.self 仅当event.target是绑定该修饰符元素自身时才会触发事件（即事件不是内部元素触发的）

.passive 滚动事件的默认行为(即滚动行为)会立即触发，而不会等待绑定的事件执行完成，也会忽略event.preventDeafult()，尤其能够提升移动端的性能

**按键修饰符**

.enter /.tab / .delete / .esc / .space / .up /.down / .left / .right

**系统修饰键**

可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器

.ctrl / .alt / .shift / .meta(对应Mac的command键和Windows的徽标键)

**鼠标按钮修饰符**

.left / .right / .middle

**输入框的v-model的修饰符**

.lazy 数据同步在change事件之后发生

.number 将用户输入的值转为数值类型（如果无法被parseFloat解析，则返回原始值）

.trim 自动过滤首尾空白字符（失去焦点后触发）

#### 计算属性computed

计算属性是依赖其他变量的计算结果，只要是在get函数中**同步编写**的变量，都是当前计算属性的依赖；只有依赖发生改变时，当前get函数才会被重新调用，返回新的计算属性值。

如果需要修改计算属性的值，需要设置set函数，并在set函数中修改当前计算属性的依赖，从而再次触发get函数，重新计算。

#### computed和watch的区别和应用场景

**computed**：是计算属性，依赖其他属性值，并且computed的值有缓存，只有他依赖的属性值发生改变，下一次获取computed的值才会重新计算computed的值；

**watch**：更多的时「观察」的作用，类似于某些数据的监听回调，每当监听的数据变化时都会执行回调进行后续操作

**运用场景**：

+ 当我们需要进行数值计算，并且依赖于其它数据时，应该使用computed，因为可以利用computed的缓存特性，避免每次获取值时都要重新计算
+ 当我们需要在数据变化时执行异步或开销较大的操作时，应该使用watch，我们可以在watch函数中控制触发频率，还可以在得到最终结果前，设置中间状态，这些都是计算属性无法做到的



#### Vue组件中data为什么必须是一个函数

为了保证在组件复用时数据的独立性。

如果data使用对象，则复用组件时，多个组件实例会共用一个data对象



#### package.lock.json的作用

锁定依赖的版本号，防止下载高于当前版本的依赖



#### 为什么Vue的DOM更新是异步的？

为了节省性能，连续多次修改数据，放到一起更新一次DOM



#### $nextTick的原理

利用浏览器的event loop，异步任务会在dom更新之后执行，采用微任务优先原则，不支持微任务才去采用宏任务

(如果调用$nextTick时没有传递函数，并且支持Promise，则先返回一个pending状态的promise，等执行回调时把该promsie状态改为成功态)

优先顺序：Promise（微任务）=>MutationObserver（微任务）=>setImmediate（宏任务）=>setTimeout（宏任务）



#### 组件间数据交互

**父子组件之间的数据交互**：

最常用的方式是：

1. props 和  $emit

 其他的还有：

2. $parent / $children: 获取父/子组件实例

    ref 获取子组件或者DOM元素

3. $attrs接收所有父组件传递给子组件的没有被props接收的属性（数据没有响应式），可以通过v-bind传给内部组件（一般配合inheritAttrs:false使用）；

   $listeners接收父组件传递的所有自定义事件(不含 `.native` 修饰器)，可以通过v-on传给内部组件

4. provide & inject 祖先组件提供的数据，后代组件都可以通过inject注入使用，一般使用在高阶组件或者插件中（数据没有响应式）


**跨组件传参**   

5. eventBus 通过一个空的Vue实例作为媒介，通过这个实例上的$on,$emit,$off方法来实现组件间数据交互

6. Vuex  核心是store，store中包含着应用中所有的状态，所有的状态都是响应式的，并且只能通过提交mutation修改store中的值

**为啥没有响应式父组件修改了绑定的值，子组件也会更新？**

因为父组件数据发生修改，会更新页面，子组件的内容也会被更新

#### 父子组件生成及销毁的顺序

**生成**：

父beforCreate=>父created=>父beforeMount=>子beforeCreate=>子created=>子beforeMount=>子mounted=>父mounted

**子组件触发事件，父组件修改数据更新：**

父beforeUpdate => 儿子beforeUpdate => 儿子updated  => 父updated

**销毁：**

父beforeDestroy=>子beforeDestroy=>子destroyed=>父destroyed

**生成和销毁子组件之前都会触发父组件的beforeUpdate，子组件mounted或者destroyed会触发父组件的updated**

![image-20201214163331934](/Users/xushuxin/Library/Application Support/typora-user-images/image-20201214163331934.png)![image-20201214163412987](/Users/xushuxin/Library/Application Support/typora-user-images/image-20201214163412987.png)

注：父组件mounted可以拿到子组件以及dom元素，ref如果获取的是组件，可以通过$el属性获取到对应的根元素

#### Vue性能优化

1. data尽量扁平化处理（Vue的数据劫持方面优化，Vue会对对象递归劫持）
2. 不需要修改的数据使用Object.freeze冻结处理
3. v-if和v-show区分使用场景（v-if有更大的切换开销，v-show有更大的初始化开销）
4. v-for循环时，注重key的作用
5. 对于没有使用vue语法的模块，用v-pre指令来提升编译效率(跳过元素和它的子元素的编译过程)
6. 长列表不去直接渲染，而是通过虚拟列表去展渲染 插件  -----  vue-virtual-scroll-list
7. 组件懒加载+骨架屏 优化首屏加载速度
8. 图片懒加载  插件--- vue-lazyload
9. 对于切换时不用销毁的组件采用keep-alive进行缓存
10. ui组件库按需加载
11. 使用alias 减小文件搜索范围，提升编译效率

#### v-model的原理

v-model本质上是v-bind和v-on的语法糖

在输入框和textarea上使用value属性和input事件；

在checkbox和radio上使用checked属性和change事件

在select上使用value属性和change事件

在组件上默认使用的是value属性和input事件（可以使用model选项来配置prop和event的名字）

#### Vue2的响应式原理

遍历data对象，并通过Object.defineProperty把所有data的属性转为getter和setter

每个组件实例都对应一个watcher实例，它会在组件渲染过程中把“接触”过的属性记录为依赖，之后当依赖的setter触发时，会通知watcher，从而把它关联的组件重新渲染。

#### Vue3的响应式原理

使用ES6的Proxy来实现数据的响应式，可以支持数据，不区分数组和对象

#### 说说你对SPA单页面的理解，它的优缺点分别是什么？

 单页面只有一个html页面，用户看到的不同“页面“，都是通过路由机制实现html内容替换，一般首次都会把公共的js，css资源加载，然后，单个功能页面的资源可以通过路由懒加载按需加载。

优点：

```js
1. 页面切换快，用户体验好，内容改变不需要重新加载页面，避免了重复渲染
2. 基于第一点，单页应用对服务器的压力小
3. 前后端分离，架构清晰，有利于维护
```

缺点：

```js
1. 首次加载时可能耗时较长
2. 不能使用浏览器的前进后退功能，所有页面的切换需要自己建立堆栈管理
3. 不利于SEO
```

#### 为什么Vue3使用Proxy而抛弃了Object.defineProperty?

因为Proxy相对于Object.defineproperty有很多优点：

1.Object.defineProperty每次只能劫持单个属性，需要遍历对象甚至递归遍历才能劫持一个对象的所有属性，数据较多时性能消耗较大

2.Object.defineProperty劫持不到动态增加的属性

3.由于性能问题vue2没有使用Object.defineProperty劫持数组的索引和长度，只能劫持数组中的对象，以及重写会改变数组的方法

因此Vue3引入了最新的Proxy：

1.Proxy可以代理整个对象，不需要遍历，性能更好,并且新增的属性也会一并被代理

2.Proxy支持数组的代理，通过索引访问数组项时也会触发捕捉函数

3.Proxy有13种捕捉函数（比如apply，construct，ownKeys,deleteProperty等等）,支持更丰富的拦截功能

4.作为一个新标准，Proxy更受到浏览器厂商的重点关注和性能优化

备注：

Proxy不支持ie，仅支持符合ES2015规范的浏览器

Object.defineProperty支持ie9 (ES5规范)



#### ref的作用

1.获取dom元素

2.获取子组件中的data

3.调用子组件中的方法



#### Vue中key的有什么作用

1. 是元素和组件的唯一标识
2. 可以防止元素复用（sameNode函数中a.key===b.key的对比中可以避免就地复用的情况）
3. 可以提升diff算法的效率（利用key的唯一性生成map对象来获取对应节点，比遍历方式更快）

理想的key应该是一个唯一的id

#### 为什么不建议使用数组索引作为key（用数组索引作为key会有什么缺陷）

因为如果把数组索引作为key，删除一项时，后续项索引都会发生变化，key也跟着改变，删除前后的key对不上会导致vue的dom diff算法混乱，出现未知bug，比如元素复用

#### 说一下Vue的DOM diff算法



#### 谈一谈你对keep-alive的了解？

keep-alive是Vue内置的一个组件，可以使被包含的组件保留状态，避免重新渲染。具有以下几个特性：

+ 提供include和exclude，include表示只有名称匹配的组件会被缓存，exclude表示名称匹配的组件都不会被缓存，其中exclude的优先级比include高，两者都支持字符串（组件名用逗号隔开）、数组、正则表达式
+ 提供max属性，设置大缓存组件数量
+ 对应两个钩子函数activated和deactivated，当组件**被激活时，触发钩子函数activated**，当组件被**移除时，触发钩子函数deactivated**
+ keep-alive要求同时**只有一个子元素被渲染**
+ keep-alive一般**结合路由和动态组件一起使用**，用于缓存组件
+ **keep-alive不能用于函数式组件**



#### 什么是函数式组件？

1.是一个只接收一些prop的函数，组件需要的一切都是通过context传递

2.没有状态（没有响应式数据），也没有实例（没有this上下文）

3.因为函数式组件只是函数，所以函数开销低很多


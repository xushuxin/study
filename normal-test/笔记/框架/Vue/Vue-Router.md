#### $route和$router

$route 存放的是数据

$router 存放的是方法

#### $router.push与$router.replace的区别

$router.push(字符串/对象)  会产生新的历史记录

$router.repalce(字符串/对象) 直接替换当前组件，不会产生新的历史记录

#### 动态路由匹配

定义：把多个路由映射到同一个组件

实现：使用”动态路径参数“

+ 动态路径参数以冒号开头，冒号后面为参数值

+ 当匹配到一个路由时，参数值会被设置到this.$route.params

+ 可以设置多段路径参数,如`/user/:username/post/:post_id`,参数：`{ username: 'evan', post_id: '123' }`

+ 使用路径参数时，组件实例会被复用（生命周期函数不会再被调用）

  解决方案：

  + 使用watch监听$route对象
  + 使用2.2引入的beforeRouteUpdate导航守卫

+ 使用通配符匹配任意路径（放在最后，用于客户端404错误）

+ 高阶应用

#### 拦截器（官方：路由守卫）

##### 全局前置守卫：router.beforeEach

传入一个守卫方法，每个守卫方法接收三个参数：

+ to :即将要进入的目标路由对象

+ from： 当前导航正要离开的路由

+ next：调用这个方法，控制路由的跳转行为（确保在路由守卫中只被调用一次）

##### 全局解析守卫： router.beforeResolve

注册一个全局守卫。这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫才被调用。

##### 全局后置钩子：router.afterEach

+ 守卫方法仅接收to，from，不接收next方法，不会改变导航跳转
+ 导航被确认后触发

##### 路由独享的守卫：

在路由配置上定义beforeEnter守卫

##### 组件内的守卫

+ beforeRouteEnter 
  + 路由解析完成，导航被确认之前调用
  + 路由守卫方法接收从三个参数to、from、next
  + 不能访问this，组件还未创建
  + 可以通过传递一个回调给next，在导航被确认时会执行回调，并把组件实例作为回调方法的参数
+ beforeRouteUpdate
  + 复用该组件时调用
  + 可以使用this
+ beforeRouteLeave
  + 离开该组件时调用
  + 可以使用this

![image-20210103114645988](/Users/xushuxin/Library/Application Support/typora-user-images/image-20210103114645988.png)

#### 路由懒加载

+ Vue的异步组件

  定义：返回一个resolve值为组件对象的Promise的工厂函数

+ 使用webpack提供的**动态import**

  根据路径导入一个组件，返回一个Promise

+ 把组件按组分块

  目的：单个路由下的所有异步组件打包到同个异步块

  方法：使用命名chunk（webpack>2.4）

  ```js
  const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
  const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
  ```






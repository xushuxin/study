#### 请介绍一下你对Vuex的理解？

Vuex是一个专为Vue.js应用程序开发的状态管理模式。每一个Vuex应用的核心就是store。”store“本质上就是一个容器，它包含着应用中大部分的状态（state）。

1.Vuex的状态存储是响应式的，当Vue组件从store中读取状态的时候，若store中的状态发生变化，那么相应的组件也会相应地得到高效更新

2.改变store中的状态的唯一途径就是显示地提交（commit）mutation。这样使得我们可以方便的跟踪每一个状态的变化。

Vuex主要包括State、Getter、Mutation、Action、Module几个模块

State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。

Getter：从store的state中派生出来的一些状态（可以认为是store的计算属性），当依赖值发生改变时，会跟着一起改变，mapGetters辅助函数仅仅是将store中的getter映射到局部计算属性

Mutation:是更改store中状态的唯一方法，并且必须是同步函数

Action：用于提交mutation，而不是直接变更状态，可以包含任意异步操作（所以我们一般用来统一管理接口请求）

Module：允许我们将store分割成模块，每个模块有自己的state、mutation、action、getter，甚至是module，模块内的mutation默认都是注册在全局命名空间的；如果希望模块具有更高的封装度和复用性，可以通过添加namespaced:true的方式，使其成为带命名空间的模块。

#### 为什么要使用Vuex？

如果直接修改store中的数据，不方便跟踪每个状态的变化，不利于维护

#### Vuex存储的状态，页面刷新后，为什么没有了，如何解决这个问题？

因为页面重新加载，所有变量都回收了，然后所有js代码重新执行，Vuex重新初始化了。

解决：使用客户端存储（localStorage或者sessionStorage）


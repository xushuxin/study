 

  reducer = 数据管理员

  redux = 数据模型

  react-redux = react与redux的连接桥梁

  数据更改必须通过reducer来更改

  react和redux 没有什么关系； react-redux 把他们两个联系到了一起

#####   react-redux 用法

  1 . 使用 Provider组件把跟组件包起来 然后给Provider传一个 store 对应的值就是 createStore产生的那个store

  2 . 哪个后代组件想要使用 redux中的数据 就需要使用 connect 处理

​    新组件 = connect(回调函数1,回调函数2（可以省略）)(要处理的组件)

​    渲染时，渲染的都是新组件

​    回调函数1和回调函数2 返回值必须是一个对象，这个对象中的属性 最终会被传递给“要处理的组件”

​    回调函数1接收一个 state 参数

​    回调函数2 接收一个 dispatch 参数

​    处理完成的组件 可以通过 props获取 两个回调函数的返回结果

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux'
import store from './store'//使用redux.createStroe创建的store
class App extends React.Component{
  //...
}
App = connect((state) => {
  return {
    state: state
  }
}, (dispatch) => {
  return {
    dispatch: dispatch
  }
})(App);
ReactDOM.render(<Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'))
```



+ 项目中，一般会进行文件拆分，每个reducer放到一个单独文件里

+ 采用宏管理（如果不考虑浏览器兼容性，可以使用Symbol作为唯一标识）

+ dispatch触发操作可以封装成action函数，统一管理（方便维护）

+ 项目中的接口请求一般也可以使用action管理，但是由于是异步的，需要使用函数，需要使用redux-thunk和redux的applyMiddleware支持函数语法

  store.js

  ```jsx
  import thunk from "redux-thunk";
  import {applyMiddleware} from 'redux';
  let rootReducer = combineReducers({
    //多个reducer
  })
  let store  = createStore(rootReducer,applyMiddleware(thunk));//核心
  ```


##### react-redux原理（Provider和connect）

感觉上就是装饰者模式，给组件包了一层，给组件添加一些公共的属性和发方法

```jsx
import React from 'react';
const MyContext  = React.createContext();//创建一个上下文
export class Provider extends React.Component {
  render() {
    let { store, children } = this.props//从props中获取到传递的store和子元素
     // 提供一个上下文，包含store的对象
    return <MyContext.Provider value={{ store: store }}>
      {children}
    </MyContext.Provider>
  }
}
export const connect = function (mapStateToProps, mapDispatchToProps) {
  return function (Com) {
    // Com  就是 App
    // Temp是一个中间组件，用来传递公共的参数给实际渲染的组件
    class Temp extends React.Component {
      static contextType = MyContext;//这样我们可以通过this.contex获取到上下文中的数据
      componentDidMount() {//组件首次加载时订阅修改事件，disptach触发时会执行回调，setState更新视图
        this.clear = this.context.store.subscribe(() => {
          this.setState({})
        })
      }
      componentWillUnmount() {//组件卸载时清除订阅事件
        this.clear()
      }
      render() {
        console.log('render')
        return <Com
          {...mapStateToProps(this.context.store.getState())}//从context中获取store的所有属性
          {...this.props}//传递给原本应该传给原组件的props参数
          {...mapDispatchToProps(this.context.store.dispatch)} />//获取store中的dispatch方法
      }
    }
    return Temp
  }
}

```


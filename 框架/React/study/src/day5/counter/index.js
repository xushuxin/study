import React from 'react';
import ReactDOM from 'react-dom';
//1.从react-redux中引入Provide,connect
import { Provider, connect } from 'react-redux'
//2.引入我们通过redux创建的store对象
import store from './store/store'
import Button from './button'
class App extends React.Component {

  render() {
    console.log(this)
    return <div className=''>
      <h1>{this.props.number}</h1>
      <Button></Button>
    </div>;
  }
}
//4.使用react-redux提供的connect函数创建一个高阶组件,给当前组件添加props属性
//第一个参数是回调函数,如果没传第二个参数，第一个回调函数的参数是Provider组件传递的store对象
App = connect((state) => {
  console.log(state)
  return {
    number: state.count
  }
})(App)

//3.使用redux-react提供的Provider组件包裹当前组件，并传递store属性,属性值为redux的createStore创建的store
ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'))



/*
  reducer = 数据管理员
  redux = 数据模型
  react-redux = react与redux的连接桥梁
  数据更改必须通过reducer来更改

  redux 用法
  通过createStore 产生一个store,这里需要给通过createStore 传递一个reducer函数
  reducer就是一个根据action（{type:'xxx',自定义属性名：’xxx'}）来更新state的纯函数

  react和redux 没有什么关系； react-redux 把他们两个联系到了一起

  react-redux 用法
  1 - 使用 Provider组件把跟组件抱起来 然后给Provider传一个 store 对应的值就是
        createStore产生的哪个store

  2 - 哪个后代组件想要使用 redux中的数据 就需要使用 connect 处理

    connect（一个 高阶组件） 处理
    新组件 = connect(回调函数1,回调函数2（可以省略）)(要处理的组件)
    渲染时 渲染的都是新组件

    回调函数1和回调函数2 返回值必须是一个对象，这个对象中的属性 最终会被传递给“要处理的组件”

    回调函数1接收一个 state 参数
    回调函数2 接收一个 dispatch 参数

    处理完成的组件 可以通过 props获取 两个回调函数的返回结果



*/
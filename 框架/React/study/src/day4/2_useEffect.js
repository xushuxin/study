import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// class App extends React.Component {
//   state = {
//     count: 0
//   }
//   componentDidMount() {
//     document.title = `点击了${this.state.count}次`
//   }
//   componentDidUpdate() {
//     document.title = `点击了${this.state.count}次`
//   }
//   render() {
//     return <>
//       <h2>改title</h2>
//       <h1>{this.state.count}</h1>
//       <button onClick={
//         () => { this.setState({ count: this.state.count + 1 }) }
//       }>+</button>
//     </>
//   }
// }

function Child() {
  useEffect(() => {
    console.log('儿子mounted')
    return function () {
      // 这个返回的回调函数 能执行多少次是根据上边的回调函数的执行次数决定的
      console.log("儿子销毁")
    }
  }, [])
  return <h1>儿子</h1>

}

function App() {
  let [count, setCount] = useState(0);
  let [count2, setCount2] = useState(0);
  //1- useEffect(回调函数)   //这个回调函数 会在初次加载完成和 更新完成之后触发
  //    说白了就是类组件的 componentDidMount和componentDidUpdate的合体
  // useEffect(() => {
  //   document.title = `点击了${count}次`
  // })

  // 2- useEffect(回调函数,[])  就是相当于 componentDidMount

  // 3- useEffect(回调函数,[依赖])  只有依赖发生改变的时候 才会执行回调函数
  // useEffect(() => {
  //   console.log('mounted')
  //   return function () {

  //   }
  // }, [count])
  return <>
    <h2>改title</h2>
    <h1>{count}</h1>
    <button onClick={
      () => { setCount(++count) }
    }>+</button>
    <button onClick={
      () => { setCount2(++count2) }
    }>++</button>
    {
      count < 3 ? <Child /> : null
    }
  </>
}

ReactDOM.render(<App />, document.getElementById('root'))
import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';

function App() {
  // name count 
  let reducer = (state, action) => {
    // action 就是 dispatch执行的时候传递的哪个对象
    // state就是我们更新之前的老数据
    // 最终结果 是 用这个函数的返回结果 来作为新的state
    switch (action.type) {
      case 'add':
        return {
          ...state,
          count: action.nnn
        }
      case 'minus':
        return {
          ...state,
          count: action.nnn
        }
      case 'changeName':
        return {
          ...state,
          name: action.name123
        }
      default:
        return {
          ...state
        }
    }

  }
  let [state, dispatch] = useReducer(reducer, { count: 100, name: "珠峰" });
  // let [状态，派发函数] = useReducer(reducer函数，初始值（一般都是对象）)
  // dispatch 是用来修改state的； 通过 让 reducer执行的方式来修改state
  //   react 会使用 reducer函数的返回结果 来顶替老的state;
  console.log(state)
  return <>
    <h2>{state.name}  {state.count}</h2>
    <button onClick={
      () => {
        dispatch({ type: "add", nnn: state.count + 1 })
      }
    }>+</button>
    <button onClick={
      () => {
        dispatch({ type: "minus", nnn: state.count - 1 })
      }
    }>-</button>
    <input type="text" value={state.name} onChange={
      (e) => {
        dispatch({ type: 'changeName', name123: e.target.value })
      }
    } />
  </>
}

ReactDOM.render(<App />, document.getElementById('root'))
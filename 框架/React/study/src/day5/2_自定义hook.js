import React, { useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';

function useLogger(reducer, initState) {
  let [state, dispatch] = useReducer(reducer, initState)

  let myDispatch = (action) => {
    console.log('老状态：', state);
    dispatch(action)
    // console.log('新状态：', state)
  }
  useEffect(() => {
    console.log('新状态：', state)
  }, [state])


  return [state, myDispatch]
}

function Counter() {
  function reducer(state, action) {
    switch (action.type) {
      case 'ADD':
        return {
          ...state,
          count: state.count + action.num
        }
      case 'MINUS':
        return {
          ...state,
          count: state.count - action.num
        }

      default:
        return {
          ...state
        }
    }
  }
  // let [state, dispatch] = useReducer(reducer, { count: 100 })
  let [state, dispatch] = useLogger(reducer, { count: 100 })
  return <>
    <h2>当前数字是:{state.count}</h2>
    <button onClick={() => { dispatch({ type: 'ADD', num: 10 }) }}>+</button>
    <button onClick={() => { dispatch({ type: 'MINUS', num: 5 }) }}>-</button>
  </>
}

function App() {
  return <>
    <Counter />
  </>
}

ReactDOM.render(<App />, document.getElementById('root'))
#####   redux 用法

  通过createStore 产生一个store,这里需要给通过createStore 传递一个reducer函数

  reducer就是一个根据action（{type:'xxx',自定义属性名：’xxx'}）来更新state的纯函数

store/index.js

```jsx
import { createStore } from 'redux'

let initState = {
  count: 100
}
function reducer(state, action) {
  state = state || initState;
  switch (action.type) {
    case 'add':
      return {
        ...state,
        count: state.count + action.num123
      }
    case 'minus':
      return {
        ...state,
        count: state.count - action.num123
      }

    default:
      return {
        ...state
      }
  }
}

let store = createStore(reducer);
export default store
```

多个reducer

使用combineReducers处理

```jsx
let rootReducer = combineReducers({
  //使用时注意多了一层结构,使用store.reducer1.getState()获取值
  reducer1,
  reducer2
})
let store  = createStore(rootReducer);//核心
```

入口js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/index2'

class App extends React.Component{
  componentDidMount(){//页面首次渲染时添加订阅事件
    this.unSub = store.subscribe(()=>{//dispatch会触发执行回调
      this.setState({});//触发视图更新
    })
  }
  componentWillUnmount(){
    this.unSub();//一般在卸载页面时清除订阅事件
  }
  render(){
    return <div className=''>
      <div>{ store.getState().count}</div>
      <button onClick={()=>{
        store.dispatch({type:'add',num:5})
        console.log(store.getState())
      }}>+</button>
      <button onClick={()=>{
        store.dispatch({type:'minus',num:5})
      }}>-</button>
    </div>
 }
}
ReactDOM.render(<App/>,document.getElementById('root'))
```



##### redux原理

```jsx
export function createStore(reducer, fn) {
  let state;
  let listeners = [];// 事件池
  function getState() {
    return JSON.parse(JSON.stringify(state))
  }
  function subscribe(f) {
    listeners.push(f);
    return function () {
      listeners = listeners.filter(item => item !== f)
    }
  }
  function dispatch(action) {
    state = reducer(state, action)
    listeners.forEach(item => {
      item && item()
    })
  }
  dispatch({})
  if (typeof fn === 'function') {
    return fn(createStore)(reducer)
  }
  return {
    getState,
    subscribe,
    dispatch
  }
}
```

combineReducers原理

```js
export function combineReducers(obj) {
  return function(state, action) {
    state = state || {};
    Object.keys(obj).forEach(key => {
      state[key] = obj[key](state[key], action)
    })
    return state
  }
}
```

applyMiddleware原理

```jsx
function compose(...fns) {
  let last = fns.pop()
  return function (...arg) {
    return fns.reduceRight((prev, cur) => {
      return cur(prev)
    }, last(...arg))
  }
}
export function applyMiddleware(...middlewares) {
  return function (createStore) {
    return function (reducer) {
      let store = createStore(reducer)
      let middles = middlewares.map(item => item(store))
     
      let middleDispatch = compose(...middles)(store.dispatch);
      return {
        ...store,
        dispatch: function (action) {
          console.log('使用中间件创造的dispatch')
          return middleDispatch(action)
        }
      }
    }
  }
}
```

redux-thunk原理

```jsx
export const thunk = store => dispatch => action => {
  if (typeof action === 'function') {
    return action(dispatch, store.getState)
  } else {
    return dispatch(action)
  }
}
```

自己实现中间件

```jsx
export const looger = store => dispatch => action => {
  console.log("老值是：", store.getState())
  dispatch(action)
  console.log("新值是：", store.getState())
}
```


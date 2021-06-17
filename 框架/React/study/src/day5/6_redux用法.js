import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/index'

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
      {/* 通过getState获取store中的state */}
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
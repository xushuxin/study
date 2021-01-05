import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';

//函数式组件中，本来是没有状态的，直接使用变量，修改变量，不能触发视图更新
//使用useState，可以让函数式组件拥有自己的状态
//每一次渲染都是一个独立的闭包（异步操作获取的值不是最新的值，只是当前本次函数执行的结果）
//可以使用useRef获取最新值（只能用current属性）
//
function App() {
  // var count = 100;
  var [count, setCount] = useState(100);//第一个是要使用的值，第二个是更新函数
  var [count2, setCount2] = useState(66);//每一个参数都有自己的独立的hooks
  let objRef = useRef();//useRef的使用
  objRef.current = count;
  function add() {
    setCount(++count);
    setCount2(++count2);
    objRef.current = count;//需要在修改参数的地方保存最新值
    console.log(count)
  }
  function asyncLog() {
    console.log('同步获取count', count);//100
    setTimeout(() => {
      console.log('异步获取count', count);//点击异步获取，三次加1后，结果101
      console.log('使用useRef获取的值', objRef.current)//点击异步获取，三次加1后，结果103
    }, 2000)
  }
  return <div>
    <h2>{count}</h2>
    <h2>{count2}</h2>
    <button onClick={add}>加1</button>
    <button onClick={asyncLog}>异步获取</button>
  </div>
}

//更新函数，可以接受一个回调函数作为参数,执行时会把最新值传递给回调函数
function Counter() {
  let [count, setCount] = useState(100);
  let [name, setName] = useState('珠峰')
  function add() {
    setCount(++count);
  }
  function minus() {
    setTimeout(() => {
      setCount(function (num) {
        console.log(arguments);
        return --num;
      })
    }, 3000)
  }
  function changeName(){
    setName(name=>name+'培训')
  }
  return <div>
    <div>{count}</div>
    <div>
      <button onClick={add}>异步加1</button>
      <button onClick={minus}>异步减1</button>
    </div>
    <div>{name}</div>
    <div>
      <button onClick={changeName}>changeName</button>
    </div>
  </div>
}

//想要把所有数据使用一个useState管理，可以通过对象的方式
//但是需要useState的更新函数，是用新参数替换老参数而不是合并,所以修改时需要把原有的对象属性先加上
function Counter2(){
  let [state,setState] = useState({
    name:'珠峰',
    count:100
  })
  function add(){
    setState({
      ...state,//获取原有属性
      count:++state.count
    })
  }
  function changeName(){
    setState({
      ...state,
      name:state.name+'培训'
    })
  }
  return <div>
    <h2>{state.count}
      <button onClick={add}>加1</button>
    </h2>
    <h2>
      {state.name}
      <button onClick={changeName}>修改名称</button>
    </h2>
  </div>
  
}

// useState可以接受一个函数作为参数，并将函数返回值作为值
//初始化数据仅会执行一次
function Counter3(){
  let [count,setCount] = useState(()=>{
    console.log('useState');
    return 100;
  });
  function add(){
    setCount(++count)
  }
  return <div>
    <div>数量：{count}</div>
    <div>
      <button onClick={add}>加1</button>
    </div>
  </div>
}

//react hook只能在最外层按相同顺序执行
function Counter4(){
  let count,setCount;
  //不能在条件语句中使用react hook
  // if(true){
  //   [count,setCount] = useState(100);
  // }
  return <div>
    <div>{count}</div>
  </div>
}
ReactDOM.render(<App />, document.getElementById('root'))
// ReactDOM.render(<Counter />, document.getElementById('root'))
// ReactDOM.render(<Counter2 />, document.getElementById('root'))
// ReactDOM.render(<Counter4 />, document.getElementById('root'))
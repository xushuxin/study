/* useCallback用来缓存函数的地址，仅当依赖发生改变时，才会返回一个新的函数地址 */
/* + useMemo和useCallback都属于优化项，均需要结合memo使用
   + 类组件的优化，直接使用class extends React.PureComponent去定义组件类即可  
    PureComponent 纯组件：当组件接收的参数没有发生任何改变的时候，当前组件不会再去执行render
类似于静态组件的memo函数与useMemo和useCallback的组合使用 */
import React, { memo,useState,useCallback } from 'react';
import ReactDOM from 'react-dom';
function Child({name,onMinus}) {
  console.log('onMinus发生改变 child render')
  return <h1>{name}</h1>
}
Child = memo(Child)
function App() {
  let [count, setCount] = useState(100);
  let [name, setName] = useState('珠峰');
  let add =(e)=>{setCount(++count)};
  let change=(e)=>{setName(e.target.value)}
  let minus =useCallback(()=>{
    console.log('触发minus')
    setCount(--count);
  },[name]);//[依赖]
  return <>
    <button onClick={add}>+</button>
    <input type="text" onChange={change}/>
    <h2>{count}</h2>
    <Child name={name} onMinus={minus}></Child>
    <button onClick={minus}>-</button>
  </>
}
ReactDOM.render(<App />, document.getElementById('root'))
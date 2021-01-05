/* memo处理过的组件，若传给组件的数据没有发生改变，那么组件就不会重新执行 */
/* useMemo是用来缓存对象，仅当其依赖发生修改时才重新执行返回一个新的对象地址 */
import React, { memo,useState,useMemo } from 'react';
import ReactDOM from 'react-dom';
function Child({name}) {
  console.log('child render')
  return <h1>{name}</h1>
}

Child = memo(Child)

function Child2({data}){
  console.log('child2 render');
  return <h1>
    name:{data.name}
    age:{data.age}
  </h1>
}
Child2 =memo(Child2);
function App() {
  let [count, setCount] = useState(100);
  let [name, setName] = useState('珠峰');
  let add =(e)=>{setCount(++count)};
  let change=(e)=>{setName(e.target.value)}
  let data = useMemo(()=>{
    console.log('依赖发生name修改时，执行useMemo,返回一个新的对象地址')
    return {
      age:100,
      name:name
    }
  },[name]);//[依赖]
  return <>
    <button onClick={add}>+</button>
    <input type="text" onChange={change}/>
    <h2>{count}</h2>
    <Child name={name}></Child>
    <Child2 data={data}></Child2>
  </>
}
ReactDOM.render(<App />, document.getElementById('root'))
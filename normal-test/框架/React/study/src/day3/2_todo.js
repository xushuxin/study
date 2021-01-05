/* 函数式组件实现todoList */
import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import List from './components2/list';
import Input from './components2/input';
let jsonData = localStorage.getItem('todoList');
const cachelist =jsonData?JSON.parse(jsonData):[];
function App() {
  let [todo,setTodo] =useState('');
  let [list,setList] =useState(cachelist);
  function change(e){
    setTodo(e.target.value);
  }
  function submit(e){
    let temp = list.concat({
      id:Math.random(),
      text:todo
    })
    localStorage.setItem('todoList',JSON.stringify(temp));
    setList(temp);
    setTodo('');
  }

  function del(e,index,item){
    list=list.filter((item,i)=>i!==index);
    localStorage.setItem('todoList',JSON.stringify(list));
    setList(list);
  }

  return <div className=''>
    <Input value={todo} onChange={(e) => { change(e) }} onEnter={submit}></Input>
    <List data={list} onClick={del}></List>
  </div>
}
ReactDOM.render(<App />, document.getElementById('root'))
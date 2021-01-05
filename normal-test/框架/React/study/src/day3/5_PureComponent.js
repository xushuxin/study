import React from 'react';
import ReactDOM from 'react-dom';
import List from './pure-components/list';
import Input from './pure-components/input';
let jsonData = localStorage.getItem('todoList');
const list =jsonData?JSON.parse(jsonData):[];
class App extends React.Component{
  state={
    todo:'',
    list:list
  }
  change=(e)=>{
    this.setState({
      todo:e.target.value
    })
  }
  submit=(e)=>{
    if(!e.target.value) return alert('请输入文字');
    this.setState({
      list:this.state.list.concat({
        id:Math.random(),
        text:this.state.todo,
      }),
      todo:''
    },function(){
      localStorage.setItem('todoList',JSON.stringify(this.state.list))
    })
  }
  onClick=(e,index)=>{
    this.setState({
      list:this.state.list.filter((item,idx)=>idx!==index)
    },function(){
      localStorage.setItem('todoList',JSON.stringify(this.state.list))
    })
  }
  render(){
    let {todo,list} = this.state;
    return <div className=''>
      <Input value={todo} onChange={(e)=>{this.change(e)}} onEnter={this.submit}></Input>
      <List data={list} onClick={this.onClick}></List>
    </div>
 }
}
ReactDOM.render(<App/>,document.getElementById('root'))
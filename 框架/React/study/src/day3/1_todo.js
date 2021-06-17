import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/list';
import Input from './components/input';
let jsonData = localStorage.getItem('todoList');
const list =jsonData?JSON.parse(jsonData):[];
class App extends React.Component{
  state={
    todo:'',
    list:list
  }
  change=(e)=>{
    console.log('输入框内容修改了',e.target.value);
    this.setState({
      todo:e.target.value
    })
  }
  submit=(e)=>{
    console.log('点击了提交按钮',e);
    if(!e.target.value) return alert('请输入文字');
    this.setState({
      list:this.state.list.concat({
        id:Math.random(),
        text:this.state.todo,
      }),
      todo:''
    },function(){
      console.log(this);
      localStorage.setItem('todoList',JSON.stringify(this.state.list))
    })
  }
  onClick=(e,index)=>{
    console.log('触发点击事件',e,index);
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
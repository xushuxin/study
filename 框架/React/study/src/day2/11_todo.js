import React from 'react';
import ReactDOM from 'react-dom';
/**
 * 1.列表项需要唯一key值（建议使用id）
 * 2.修改数据要使用setState
 * 3.删除数据使用数组filter方法
 */
class App extends React.Component{
  state={
    todoList:[],
    todo:''
  }
  input =(e)=>{
    this.setState({
      todo:e.target.value
    })
  }
  add = ()=>{
    this.setState({
      todoList:this.state.todoList.concat(this.state.todo),
      todo:''
    })
  }
  del =(index)=>{
    this.setState({
      todoList:this.state.todoList.filter((item,index1)=>index1!==index)
    })
  }
  render(){
    const {todo,todoList} =this.state;
    return <div className=''>
      <div>
        <input type="text" value={todo} onInput={(e)=>this.input(e)}/>
        <button onClick={()=>this.add()}>添加</button>
        <ul>
          {todoList.map(
            (item,index)=>{
            return <li key={index}>
              <span>{item}</span>
              <button onClick={()=>this.del(index)}>删除</button>
            </li>
            }
          )}
        </ul>
      </div>
    </div>
 }
}
ReactDOM.render(<App/>,document.getElementById('root'))
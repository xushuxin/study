import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component{
  state = {//实例私有属性
    name:'珠峰'
  }
  fn(){//原型上的公有方法
    console.log(this.state)
  }
  fn2 = ()=>{//实例私有方法
    console.log(this.state)
  }
  render(){
    return <div className=''>
     <button onClick={()=>console.log(this.state)}>按钮1</button>
     <button onClick={this.fn}>按钮fn</button>
     <button onClick={this.fn.bind(this)}>按钮fn.bind</button>
     <button onClick={()=>{this.fn()}}>按钮箭头函数中执行fn</button>
     <button onClick={this.fn2}>按钮fn2</button>
    </div>
 }
}

ReactDOM.render(<App/>,document.getElementById('root'))
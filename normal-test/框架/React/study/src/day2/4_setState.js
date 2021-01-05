import React from 'react';
import ReactDOM from 'react-dom';

//setState是一个异步操作，修改state中的数据（合并）

class App extends React.Component{
  state={
    count:0
  }
  add(){
    this.setState({//把这个对象合并到老对象
      count:this.state.count+1
    },function(){
      //当数据更新触发这个函数
      console.log('数据已更新',this.state.count)
    })
  }
  minus(){
    this.setState({
      count:this.state.count-1
    },function(){
      //当数据更新触发这个函数
      console.log('视图已更新',this.state.count)
    })
  }
  render(){
    const {count} = this.state;
    return <div className=''>
      <button onClick={this.add.bind(this)}>加1</button>
      <button onClick={this.minus.bind(this)}>减1</button>
      <div>{count}</div>
    </div>
 }
}
ReactDOM.render(<App/>,document.getElementById('root'))
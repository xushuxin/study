import React from 'react';
import ReactDOM from 'react-dom';

//使用onInput或者onChange事件监听原生输入框内容修改
//受控组件（值绑定给React的state，通过setState设置值）
//非受控组件(通过ref获取元素，赋值)
class App extends React.Component {
  state = {
    name: '珠峰'
  }
  changeName = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  changeName2 =(e)=>{
    console.log(e.target.value)
  }
  fn=()=>{
    console.log('受控组件的值',this.state.name)
    console.log('非受控组件的值',this.input2.value)
  }

  componentDidMount(){
    console.log('组件渲染完成后，react触发这个函数')
    //给非受控组件赋值
    this.input2.value ='666';
  }
  render() {
    let {name} = this.state;
    return <div className=''>
      <h1>{name}</h1>
      {/* 受控组件 */}
      <input type="text" value={name} onChange={this.changeName} />
      {/* 非受控组件 */}
      <input type="text" ref={el=>this.input2 = el} onInput={this.changeName2}/>
      <div><button onClick={this.fn}>获取两个组件的值</button></div>
    </div>
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
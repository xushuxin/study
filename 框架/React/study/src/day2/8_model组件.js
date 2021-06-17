import React from 'react';
import ReactDOM from 'react-dom';
import Model from './components/model.js'

class App extends React.Component{
  state={
    show:true
  }
  close = ()=>{
    this.setState({
      show:false
    })
  }
  ok =()=>{
    console.log('用户点击了OK');
  }
  cancel=()=>{
    console.log('用户点击了取消')
    this.close()
  }
  render(){
    const {show} = this.state;
    return <Model
            className="cust-class"
            isShow={show}
            onOk ={this.ok}
            onCancel={this.cancel}
            onClose={this.close}
            title={<div>这是传入的头部</div>}
          />
 }
}
ReactDOM.render(<App/>,document.getElementById('root'))
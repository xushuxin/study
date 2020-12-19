import React,{useState} from 'react';
import ReactDOM from 'react-dom';

function Child(props){
  // console.log(props);
  var [a,change] = useState([123,456]);
  return <div className={props.className}>
    Child {props.qq}
    <div>{a} {change}</div>
  </div>
}

class Child2 extends React.Component{
  //React.Component默认会执行constructor接收props参数
  // constructor(props){
  //   super(props);
  //   this.state={
  //     name:'珠峰'
  //   }
  // }
  state = {
    name:'zhufeng1'
  }
  render(){
    console.log(this.props)
    console.log(this.state)
    return <div>
      child2 {this.state.name}
    </div>
  }
}

class App extends React.Component{
  render(){
    return <div className=''>
      hello
      <Child className="box1" qq="box1"></Child>
      <Child2 className="box2" qq="box2"></Child2>
    </div>
  }
}
ReactDOM.render(<App/>,document.getElementById('root'))
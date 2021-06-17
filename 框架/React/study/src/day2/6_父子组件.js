import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';//按需引入
//类组件
class Child extends React.Component {
  //propTypes是用来做类型检测的,用.来设置
  static propTypes = {
    myname:PropTypes.string
  }
  change=()=>{
    this.props.onChangeName('儿子的数据')
  }
  render() {
    let { myname } = this.props;
    return <div>
      child
      <h2>{myname}</h2>
      <div>
        <button onClick={this.change}>修改name</button>
      </div>
    </div>
  }
}

//函数式组件
function Child2(props){
  function change(){
    props.onChangeName('child2的数据')
  }
  return <div>
    <h2>child2</h2>
    <div>{props.myname}</div>
    <div>
      <button onClick={change}>child2修改name</button>
    </div>
  </div>
}

Child2.propTypes={
  myname:PropTypes.string
}

class App extends React.Component {
  state = {
    name: 'child的name'
  }
  childEvent=(name)=>{
    this.setState({
      name
    })
  }
  render() {
    let { name } = this.state;
    return <div className=''>
      <Child myname={name} onChangeName={this.childEvent}/>
      <Child2 myname={name} onChangeName={this.childEvent}/>
    </div>
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
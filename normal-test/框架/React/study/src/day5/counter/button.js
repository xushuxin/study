import React from 'react';
import { connect } from 'react-redux'//1.引入connect
class Button extends React.Component {
  render() {
    console.log(this)
    return <div>
      <button className='' onClick={() => {
        this.props.add(20)
      }}>{this.props.n}++</button>

      <button className='' onClick={() => {
        this.props.minus(5)
      }}>{this.props.n}--</button>
    </div>;
  }
}
//2.创建高阶组件，给当前组件添加props 属性和方法
//第一个回调函数接收参数
//第二个回调函数接收disptach方法
Button = connect((state => {
  return {
    n: state.count
  }
}), (dispatch) => {
  return {
    add(n) {
      dispatch({ type: 'add', num123: n })
    },
    minus(n) {
      dispatch({ type: 'minus', num123: n })
    }
  }
})(Button)
export default Button
import React from 'react';
import { connect } from 'react-redux'
class Input extends React.Component {
  state = {
    todo: ''
  }
  changeTodo = (e) => {
    this.setState({
      todo: e.target.value
    })
  }
  inpSubmit = (e) => {
    if (e.keyCode === 13) {
      this.props.submit(this.props.name + this.state.todo)
      this.setState({
        todo: ''
      })
    }
  }
  render() {
    // this.props.dispatch
    // console.log(this.props)
    let { todo } = this.state;
    return <div className=''>
      <input type="text" value={todo} onChange={this.changeTodo} onKeyDown={this.inpSubmit} />
    </div>;
  }
}
Input = connect(state => ({
  name: state.name
}), dispatch => ({
  submit(str) {
    dispatch({
      type: 'add', todo: {
        id: Math.random(),
        value: str
      }
    })
  }
}))(Input)
export default Input
import React, { useState } from 'react';
import { connect } from 'react-redux'
function Change(props) {
  let [name, setName] = useState(props.name1)
  let [age, setAge] = useState(props.age1)
  return <div>
    <input type="text" placeholder='改名字' value={name} onChange={(e) => {
      setName(e.target.value)
    }} />

    <input type="number" placeholder='改年龄' value={age} onChange={(e) => {
      setAge(e.target.value)
    }} />

    <button onClick={() => {
      props.changeAge(age)
      props.changeName(name)
    }}>修改</button>
  </div>
}
Change = connect(state => ({
  name1: state.name,
  age1: state.age
}), dispatch => ({
  changeName(name) {
    dispatch({ type: 'changeName', userName: name })
  },
  changeAge(age) {
    dispatch({ type: 'changeAge', userAge: age })
  }
}))(Change)
export default Change
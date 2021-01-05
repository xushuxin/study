import React from 'react';
import { connect } from 'react-redux'
class List extends React.Component {
  render() {
    console.log(this.props.list)
    let { list } = this.props;
    return <ul className=''>
      {
        list.map(item => {
          return <li key={item.id}>{item.value} <button onClick={() => {
            this.props.del(item)
          }}>X {this.props.age}</button></li>
        })
      }
    </ul>;
  }
}
List = connect((state) => ({ list: state.list, age: state.age }), dispatch => ({
  del(item) {

    dispatch({ type: 'remove', itemObj: item })
  }
}))(List)
export default List
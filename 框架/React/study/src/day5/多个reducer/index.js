import React from 'react';
import ReactDOM from 'react-dom';
import store from './store'
import { Provider, connect } from 'react-redux'
import { changeColor, changeCount } from './store/actions'

// import { CHNANGECOUNT, CHNANGECOLOR } from './store/type'

function getRandomColor() {
  let a = Math.floor(Math.random() * 255),
    b = Math.floor(Math.random() * 255),
    c = Math.floor(Math.random() * 255);
  return `rgb(${a},${b},${b})`
}
class App extends React.Component {

  render() {
    console.log(this)
    let { color, count } = this.props;
    return <div className=''>
      <h1 style={{ color: color }}>当前数字是{count}</h1>
      <button onClick={
        () => {
          // this.props.dispatch({ type: CHNANGECOLOR, col: getRandomColor() })
          // axios.get('url').then(data => {
          //   this.props.dispatch(changeColor(getRandomColor()))
          // })
          this.props.dispatch(changeColor(getRandomColor()))
        }
      }>换颜色</button>

      <button onClick={() => {
        // this.props.dispatch({ type: CHNANGECOUNT, num: 10 })
        this.props.dispatch(changeCount(10))
      }}>+</button>
      <button onClick={() => {
        // this.props.dispatch({ type: CHNANGECOUNT, num: -10 })
        this.props.dispatch(changeCount(-10))
      }}>-</button>
    </div>;
  }
}


// App = connect()(App)
App = connect(state => ({
  color: state.aaa.color,
  count: state.qqq.count
}))(App)

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'))
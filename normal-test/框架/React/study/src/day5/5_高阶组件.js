import React from 'react';
import ReactDOM from 'react-dom';
class App extends React.Component {

  render() {
    console.log(this.props)
    return <div className=''>

    </div>;
  }
}

function connect(obj = {}) {
  return function (Com) {
    class Temp extends React.Component {
      state = {
        sex: 0
      }
      render() {
        // console.log(this.props)
        return <Com {...obj} {...this.props} sex={this.state.sex} />
      }
    }
    return Temp
  }
}

function connect2(f1) {
  return function (Com) {
    class Temp extends React.Component {
      state = {
        sex: 0,
        age: 666
      }
      render() {
        // console.log(this.props)
        let obj = f1(this.state)
        return <Com {...obj} {...this.props} sex={this.state.sex} />
      }
    }
    return Temp
  }
}


// App = connect({ name: '珠峰', age: 12 })(App)

App = connect2((state) => {
  return {
    name: state.name || "珠峰",
    age: state.age || 12
  }
})(App)

ReactDOM.render(<App className='box' />, document.getElementById('root'))
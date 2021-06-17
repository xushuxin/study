import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/index'
import { Provider, connect } from 'react-redux'
import Input from './components/input'
import List from './components/list'
import Change from './components/change'
class App extends React.Component {

  render() {
    let { name1, age1 } = this.props;
    return <div className=''>
      <Change />
      <h2>姓名是：{name1}；年龄是：{age1}</h2>
      <Input />
      <List />
    </div>;
  }
}
App = connect((state) => {
  return {
    name1: state.name,
    age1: state.age
  }
})(App)

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'))
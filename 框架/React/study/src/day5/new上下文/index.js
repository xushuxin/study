import React from 'react';
import ReactDOM from 'react-dom';
import H1 from './h1'
import MyContext from './context'
class App extends React.Component {
  constructor() {
    super();

  }
  render() {
    return <div className=''>
      <H1 />
    </div>;
  }
}
let obj = {
  theme: 'dark',
  num: 100,
  name: "珠峰"
}
ReactDOM.render(<MyContext.Provider value={obj}>
  <App />
</MyContext.Provider>, document.getElementById('root'))
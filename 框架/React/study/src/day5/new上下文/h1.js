import React from 'react';
import Button from './button'
import MyContext from './context'
class H1 extends React.Component {
  static contextType = MyContext
  render() {
    console.log(this.context)
    return <div className=''>
      <Button></Button>
    </div>;
  }
}
export default H1
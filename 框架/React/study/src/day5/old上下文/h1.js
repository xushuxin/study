import React from 'react';
import Button from './button'
import qqq from 'prop-types'
class H1 extends React.Component {
  // constructor(props, context) {
  //   super(props, context)
  // }
  static contextTypes = {
    theme: qqq.string
  }
  render() {
    console.log(this.context)
    return <div className=''>
      <Button></Button>
    </div>;
  }
}
export default H1
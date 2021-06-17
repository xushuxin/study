import React from 'react';
import qqq from 'prop-types'
class Button extends React.Component {
  static contextTypes = {
    theme: qqq.string,
    num: qqq.number
  }
  render() {
    console.log(this.context)
    return <div className=''>

    </div>;
  }
}
export default Button
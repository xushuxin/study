import React, { useContext } from 'react';
import MyContext from './context'
// class Button extends React.Component {
//   static contextType = MyContext
//   render() {
//     console.log(this.context)
//     return <div className=''>

//     </div>;
//   }
// }

function Button() {
  const context = useContext(MyContext);
  console.log(context)
  return <h1></h1>
}
export default Button
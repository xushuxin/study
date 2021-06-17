import { createStore } from 'redux'

let initState = {
  count: 100,
  name: '珠峰'
}
function reducer(state, action) {
  state = state || initState;
  switch (action.type) {
    case 'add':
      return {
        ...state,
        count: state.count + action.num123
      }
    case 'minus':
      return {
        ...state,
        count: state.count - action.num123
      }

    default:
      return {
        ...state
      }
  }
}

let store = createStore(reducer);

// console.log(store);
export default store

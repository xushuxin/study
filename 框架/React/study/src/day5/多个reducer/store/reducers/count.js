import { CHNANGECOUNT } from '../type'
function CountReducer(state, action) {
  state = state || {
    count: 100
  }
  switch (action.type) {
    case CHNANGECOUNT:
      return {
        ...state,
        count: state.count + action.num
      }

    default:
      return {
        ...state
      }
  }
}
export default CountReducer
import { CHNANGECOLOR } from '../type'
function ColorReducer(state, action) {
  state = state || {
    color: 'red'
  }
  switch (action.type) {
    case CHNANGECOLOR:
      return {
        ...state,
        color: action.col
      }

    default:
      return {
        ...state
      }
  }
}

export default ColorReducer
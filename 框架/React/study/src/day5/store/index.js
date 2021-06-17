import {createStore} from 'redux';
let initStates = {
  count:100,
  name:'珠峰'
};
function reducer(state,action){
  state = state || initStates;
  switch(action.type){
    case 'add':
        return {
          ...state,
          count:state.count  + action.num
        }
    case 'minus':
      return {
        ...state,
        count:state.count - action.num
      }
    default:
      return {
        ...state
      }
  }
}
let store =createStore(reducer);
export default store;
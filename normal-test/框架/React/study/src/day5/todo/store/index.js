import { createStore } from 'redux'

let initState = {
  list: [{ id: 1, value: "吃饭" }, { id: 2, value: "睡觉" }, { id: 3, value: "打豆豆" }],
  name: '珠峰',
  age: 12
}
function todoReducer(state, action) {
  state = state || initState;
  switch (action.type) {
    case 'add':
      return {
        ...state,
        list: state.list.concat(action.todo)
      }
    case 'remove':
      let obj = action.itemObj;//{ id: 1, value: "吃饭" }
      // debugger
      let ary = state.list.filter(item => item.id !== obj.id)

      // let n = action.index;
      // state.list.splice(n,1)
      return {
        ...state,
        list: ary
        // list:[...state.list]
      }
    case 'changeName':
      return {
        ...state,
        name: action.userName
      }
    case 'changeAge':
      return {
        ...state,
        age: action.userAge
      }
    default:
      return {
        ...state
      }
  }
}


let store = createStore(todoReducer);
export default store;
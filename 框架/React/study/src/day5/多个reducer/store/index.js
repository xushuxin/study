import { createStore, combineReducers, applyMiddleware } from 'redux'
import ColorReducer from './reducers/color'
import CountReducer from './reducers/count'
import thunk from 'redux-thunk'

let rootReducer = combineReducers({
  //  当在组件中使用数据时 要注意这个新增了一层属性
  //  当我们执行dispatch的时候 他会把 素有的reduer都执行一遍
  qqq: CountReducer,
  aaa: ColorReducer
})
console.log(rootReducer)

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count:0
  },
  mutations: {
    add(state,n){
      console.log(arguments)
      state.count+=n
    },
    minus(state,payload){
      console.log(arguments)
      state.count-=payload.amount;
    },
    multiply(state,payload){
      console.log(arguments)
      state.count*=payload.amount;
    }
  },
  actions: {
    asyncAdd(state,payload){
      console.log(arguments)
      setTimeout(()=>{
        state.commit('minus',payload)
      },1000)
    }
  },
  modules: {
  }
})

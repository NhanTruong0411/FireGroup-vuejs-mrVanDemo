import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import auth from './auth'
export default new Vuex.Store({
  // STATE
  state: {
    is_loading_error : false,
  },

  // GETTERS = computed
  getters: {
    
  },

  // MUTATIONS = setters
  mutations: {
    setLoadingError(state, payload){
      state.is_loading_error = payload
    }
  },

  // ACTION -> call api
  actions: {
    
  },

  // MODULES
  modules: {
    auth
  }
})

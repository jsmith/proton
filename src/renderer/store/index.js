import Vuex from 'vuex'
import Vue from 'vue'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})

import Vuex from 'vuex'
import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'

Vue.use(Vuex)

const state = {
  sequencer: false
}

const getters = {getField}
const actions = {}
const mutations = {updateField}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

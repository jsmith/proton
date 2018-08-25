import VueLodash from 'vue-lodash'
import Vuetify from 'vuetify'
import Icon from 'vue-awesome/components/Icon'
import Vue from 'vue'
import VueKonva from 'vue-konva'
import 'vuetify/dist/vuetify.css'
import 'vue-awesome/icons'

const middleware = () => {
  Vue.use(Vuetify)
  Vue.component('icon', Icon)
  Vue.use(require('vue-shortkey'))
  Vue.use(VueLodash)
  if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
  Vue.use(VueKonva)
}

export default middleware

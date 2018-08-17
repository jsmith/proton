import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'

import App from './App'
import router from './router'
import store from './store'

Vue.use(Vuetify)
Vue.component('icon', Icon)
Vue.use(require('vue-shortkey'))

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

// noinspection JSUnusedGlobalSymbols
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

import Vue from 'vue'
import axios from 'axios'
import 'vuetify/dist/vuetify.css'
import 'vue-awesome/icons'

import middleware from '@/middlerware'
import App from '@/App'
import router from '@/router'
import store from '@/store'

middleware()

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

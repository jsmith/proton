import { configure } from '@storybook/vue'

import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import Piano from '@/components/Piano'
import Key from '@/components/Key'
import Sequencer from '@/components/Sequencer'
import Toolbar from '@/components/Toolbar'

Vue.use(Vuex)
Vue.use(Vuetify)

Vue.component(Piano.name, Piano)
Vue.component(Sequencer.name, Sequencer)
Vue.component(Key.name, Key)
Vue.component(Toolbar.name, Toolbar)
Vue.component('icon', Icon)
Vue.use(require('vue-shortkey'))

function loadStories() {
  require('../src/stories')
}

configure(loadStories, module)
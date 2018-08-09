import { configure } from '@storybook/vue'

import Vue from 'vue'
import Vuex from 'vuex'

import Piano from '@/components/Piano'
import Key from '@/components/Key'
import Sequencer from '@/components/Sequencer'

Vue.use(Vuex)

Vue.component(Piano.name, Piano)
Vue.component(Sequencer.name, Sequencer)
Vue.component(Key.name, Key)

function loadStories() {
  require('../src/stories')
}

configure(loadStories, module)
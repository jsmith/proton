import { configure } from '@storybook/vue'
import Vue from 'vue'

import Piano from '@/components/Piano'
import Key from '@/components/Key'
import Sequencer from '@/components/Sequencer'
import Toolbar from '@/components/Toolbar'
import FileExplorer from '@/components/FileExplorer'
import middleware from '@/middleware'

middleware()

Vue.component(Piano.name, Piano)
Vue.component(Sequencer.name, Sequencer)
Vue.component(Key.name, Key)
Vue.component(Toolbar.name, Toolbar)
Vue.component(FileExplorer.name, FileExplorer)

function loadStories() {
  require('../src/stories')
}

configure(loadStories, module)
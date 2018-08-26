import { configure } from '@storybook/vue'

import middleware from '@/middleware'

middleware()

function loadStories() {
  require('../src/renderer/stories')
}

configure(loadStories, module)
import { configure } from '@storybook/react'

function loadStyles() {
  require('../packages/dropdown/styles/main.sass')
  require('../packages/switcher/styles/main.sass')

  // Loading by context is too slow, as it goes into all packages of packages as well
  // const context = require.context('../packages/', true, /main\.sass$/)
  // context.keys().forEach(context)
}

function loadStories() {
  require('../packages/dropdown/stories.js')
  require('../packages/switcher/stories.js')

  // Loading by context is too slow, as it goes into all packages of packages as well
  // const context = require.context('../packages/', true, /^.\/[^/]+\/stories\.js$/)
  // context.keys().forEach(context)
}

configure(loadStories, module)

loadStyles()

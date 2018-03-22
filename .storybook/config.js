import { configure } from '@storybook/react'

function loadStyles() {
  require('glob-loader!./styles.pattern')

  // Loading by context is too slow, as it goes into all packages of packages as well
  // const context = require.context('../packages/', true, /main\.sass$/)
  // context.keys().forEach(context)
}

function loadStories() {
  require('glob-loader!./stories.pattern')

  // Loading by context is too slow, as it goes into all packages of packages as well
  // const context = require.context('../packages/', true, /^.\/[^/]+\/stories\.js$/)
  // context.keys().forEach(context)
}

configure(loadStories, module)

loadStyles()

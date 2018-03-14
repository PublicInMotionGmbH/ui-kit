import { configure } from '@storybook/react'

function importAll(r) {
  r.keys().forEach(r)
}

function loadStyles() {
    const context = require.context('../packages/', true, /main\.sass$/)

    importAll(context)
}

function loadStories() {
    const context = require.context('../packages/', true, /^.\/[^/]+\/stories\.js$/)

    importAll(context)
}

configure(loadStories, module)

loadStyles()

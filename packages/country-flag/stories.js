import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import CountryFlag from './src/CountryFlag'
import StorybookFlags from './src/storybook/StorybookFlags'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Country Flag', module, {
  propTables: [ CountryFlag ]
})

// Stories

addStory('initial', readme, () => (
  <div>
    <CountryFlag code='do' />
    <CountryFlag code='de' style={{ fontSize: 32 }} />
    <CountryFlag code='pl' style={{ fontSize: 48 }} />
  </div>
))

addStory('overview', readme, () => (
  <StorybookFlags />
))

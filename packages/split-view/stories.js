import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import SplitView from './src/SplitView'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Split View', module, {
  propTables: [ SplitView ]
})

// Stories

addStory('initial', readme, () => (
  <SplitView />
))

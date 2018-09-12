import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Price from './src/Price'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Price', module, {
  propTables: [ Price ]
})

// Stories

addStory('initial', readme, () => (
  <Price />
))

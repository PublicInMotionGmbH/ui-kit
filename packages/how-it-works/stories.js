import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import HowItWorks from './src/HowItWorks'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('HowItWorks', module, {
  propTables: [ HowItWorks ]
})

// Stories

addStory('initial', readme, () => (
  <HowItWorks />
))

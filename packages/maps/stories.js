import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Maps from './src/Maps'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Maps', module)

// Stories

addStory('initial', readme, () => (
  <Maps />
))

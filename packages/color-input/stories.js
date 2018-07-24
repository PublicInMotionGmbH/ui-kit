import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import ColorInput from './src/ColorInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('ColorInput', module, {
  propTables: [ ColorInput ]
})

// Stories

addStory('initial', readme, () => (
  <ColorInput />
))

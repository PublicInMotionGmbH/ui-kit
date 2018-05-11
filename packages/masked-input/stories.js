import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import MaskedInput from './src/MaskedInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Masked Input', module, {
  propTables: [ MaskedInput ]
})

// Stories

addStory('initial', readme, () => (
  <MaskedInput />
))

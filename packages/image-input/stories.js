import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import ImageInput from './src/ImageInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Image Input', module, {
  propTables: [ ImageInput ]
})

// Stories

addStory('initial', readme, () => (
  <ImageInput
    label='Browse files'
    style={{ width: 100, height: 100 }}
  />
))

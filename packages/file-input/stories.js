import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import FileInput from './src/FileInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('File Input', module, {
  propTables: [ FileInput ]
})

// Stories

addStory('initial', readme, () => (
  <FileInput />
))

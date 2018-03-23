import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/commons/story'

import TextInput from './src/TextInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Text Input', module)

// Stories

addStory('initial', readme, () => (
  <TextInput />
))

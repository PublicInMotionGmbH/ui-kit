import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import TextInput from './src/TextInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Text Input', module)

// Stories

const additionalStyling = {
  display: 'block',
  marginTop: '10px'
}

addStory('default', readme, () => (
  <div>
    <TextInput
      placeholder='Default input'
      style={additionalStyling}
    />
    <TextInput
      placeholder='Default input with errors'
      style={additionalStyling}
      hasError
    />
  </div>
))
addStory('small', readme, () => (
  <div>
    <TextInput
      placeholder='Small text input'
      size='small'
      style={additionalStyling}
    />
    <TextInput
      placeholder='Small text input with errors'
      size='small'
      style={additionalStyling}
      hasError
    />
  </div>
))

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
    <h2>Default text input</h2>
    <TextInput
      placeholder='Default input'
      style={additionalStyling}
    />
    <h2>Default text input with error </h2>
    <TextInput
      placeholder='Default input with errors'
      style={additionalStyling}
      hasError
    />
  </div>
))
addStory('small', readme, () => (
  <div>
    <h2>Small text input</h2>
    <TextInput
      placeholder='Small text input'
      size='small'
      style={additionalStyling}
    />
    <h2>Small text input with error</h2>
    <TextInput
      placeholder='Small text input with errors'
      size='small'
      style={additionalStyling}
      hasError
    />
  </div>
))

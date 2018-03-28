import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import RadioInput from './src/RadioInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Radio Input', module)

// Stories

addStory('initial', readme, () => (
  <div>
    <h3>Test radio</h3>
    <RadioInput name='test' defaultChecked>Option 1</RadioInput>
    <RadioInput name='test'>Option 2</RadioInput>
  </div>
))

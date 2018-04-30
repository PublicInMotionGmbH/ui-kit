import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import PhoneInput from './src/PhoneInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('PhoneInput', module, {
  propTables: [ PhoneInput ]
})

// Stories

addStory('initial', readme, () => (
  <PhoneInput />
))

addStory('RTL: initial', readme, () => (
  <div dir='rtl'>
    <PhoneInput />
  </div>
))

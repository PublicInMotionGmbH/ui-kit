import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import InlineInput from './src/InlineInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Inline Input', module, {
  propTables: [ InlineInput ]
})

// Stories

addStory('default', readme, () => (
  <InlineInput value='Edit me' />
))

addStory('disabled', readme, () => (
  <InlineInput value='I am disabled' disabled />
))

import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Textarea from './src/Textarea'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Textarea', module, {
  propTables: [ Textarea ]
})

// Stories

addStory('initial', readme, () => (
  <Textarea />
))

addStory('resize disabled', readme, () => (
  <Textarea resize={false} />
))

addStory('with max length', readme, () => (
  <Textarea maxLength={5} />
))

addStory('disabled', readme, () => (
  <Textarea disabled />
))

addStory('placeholder', readme, () => (
  <Textarea placeholder='write message here' />
))

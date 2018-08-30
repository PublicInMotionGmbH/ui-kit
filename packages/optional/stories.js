import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Optional from './src/Optional'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Optional', module, {
  propTables: [ Optional ]
})

// Stories

addStory('initial', readme, () => (
  <Optional name='request' label='I have a special request' />
))

addStory('collapsible', readme, () => (
  <Optional
    name='request'
    collapsible
    label='I have a special request'
  />
))

import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Countdown from './src/Countdown'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Countdown', module, {
  propTables: [ Countdown ]
})

// Stories

addStory('initial', readme, () => (
  <Countdown targetDate='2018-12-04T00:00:00+00:00' />
))

addStory('with custom format', readme, () => (
  <Countdown targetDate='2018-12-04T00:00:00+00:00' format='dd days hh hours mm minutes ss seconds' />
))

import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Slider from './src/Slider'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Slider', module, {
  propTables: [ Slider ]
})

// Stories

addStory('initial', readme, () => (
  <Slider />
))

addStory('with label', readme, () => (
  <Slider label='Range input value:' />
))

addStory('with default value', readme, () => (
  <Slider defaultValue={33} label='Default value: 33' />
))

addStory('with min & max values', readme, () => (
  <Slider min={20} max={40} label='Min: 20, Max: 40' />
))

addStory('with step', readme, () => (
  <Slider step={10} label='Step = 10' />
))

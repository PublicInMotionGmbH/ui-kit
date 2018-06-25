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

addStory('with default value', readme, () => (
  <Slider defaultValue={33} />
))

addStory('with min & max values', readme, () => (
  <div>
    Min: 20, max: 40
    <Slider min={20} max={40} />
  </div>
))

addStory('with step', readme, () => (
  <Slider step={10} />
))

addStory('with small step', readme, () => (
  <Slider step={0.01} />
))

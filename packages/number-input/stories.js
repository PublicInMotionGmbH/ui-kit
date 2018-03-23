import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/commons/story'

import NumberInput from './src/NumberInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('NumberInput', module)

// Stories

addStory('initial', readme, () => (
  <NumberInput />
))

addStory('small', readme, () => (
  <NumberInput size={'small'} />
))

addStory('with error', readme, () => (
  <NumberInput errors={['No input']} />
))

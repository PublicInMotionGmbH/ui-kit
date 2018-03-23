import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/commons/story'

import __name__ from './src/__name__'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('__title__', module)

// Stories

addStory('initial', readme, () => (
  <__name__ />
))

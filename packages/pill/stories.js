import React from 'react'

import Pill from './src/Pill'

import {
  createStoriesFactory,
  getReadmeDescription
} from '@talixo/commons/story'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Pill', module)

addStory('not controlled', readme, () => <Pill />)

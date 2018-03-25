import React from 'react'

import Breadcrumbs from './src/Breadcrumbs'

import {
  createStoriesFactory,
  getReadmeDescription
} from '@talixo/commons/story'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Breadcrumbs', module)

addStory('default', readme, () => (
  <Breadcrumbs divider='/'>
    <span>Home</span>
    <span>Issues</span>
    <span>Major</span>
  </Breadcrumbs>
))

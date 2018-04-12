import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Breadcrumbs from './src/Breadcrumbs'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Breadcrumbs', module)

addStory('default', readme, () => (
  <Breadcrumbs divider='/'>
    <span>Home</span>
    <span>Issues</span>
    <span>Major</span>
  </Breadcrumbs>
))

import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { Badge } from '@talixo/badge'

import Tab from './src/Tab'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Tab', module)

// Stories

addStory('default', readme, () => (
  <Tab>Home</Tab>
))
addStory('with badge', readme, () => (
  <Tab>Issues<Badge>21</Badge></Tab>
))
addStory('group', readme, () => (
  <div>
    <Tab active>Home</Tab>
    <Tab>Issues</Tab>
    <Tab>Projects</Tab>
    <Tab>Help</Tab>
  </div>
))

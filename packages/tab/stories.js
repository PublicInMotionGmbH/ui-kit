import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Tab from './src/Tab'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Tab', module, {
  propTables: [ Tab ]
})

// Stories

addStory('default', readme, () => (
  <Tab>Home</Tab>
))

addStory('group', readme, () => (
  <div>
    <Tab active>Home</Tab>
    <Tab>Issues</Tab>
    <Tab>Projects</Tab>
    <Tab>Help</Tab>
  </div>
))

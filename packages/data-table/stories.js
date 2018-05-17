import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import DataTable from './src/DataTable'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('DataTable', module, {
  propTables: [ DataTable ]
})

// Stories

addStory('initial', readme, () => (
  <DataTable />
))

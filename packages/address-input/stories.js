import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import AddressInput from './src/AddressInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('AddressInput', module, {
  propTables: [ AddressInput ]
})

// Stories

addStory('initial', readme, () => (
  <AddressInput />
))

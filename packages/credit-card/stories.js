import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import ExpirationDateInput from './src/ExpirationDateInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Credit Card', module, {
  propTables: [ ExpirationDateInput ]
})

// Stories

addStory('expiration date input', readme, () => (
  <ExpirationDateInput />
))

addStory('expiration date input with passed value', readme, () => (
  <ExpirationDateInput value={{ month: 1, year: 2012 }} />
))

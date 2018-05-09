import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import OptionsInput from './src/OptionsInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('OptionsInput', module, {
  propTables: [ OptionsInput ]
})

// Stories

addStory('initial', readme, () => (
  <OptionsInput options={[{id: 'op1', icon: 'person', label: 'Adults', description: 'Older than 15', min: 0, max: 10}, {id: 'op2', icon: 'rocket', label: 'Rockets'}, {id: 'op3', icon: 'face', label: 'Children', description: 'Less than 15'}]} />
))

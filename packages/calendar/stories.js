import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Calendar from './src/Calendar'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Calendar', module)

// Styles for stories
const styles = {
  position: 'relative',
  left: '1px'
}

// Stories

addStory('default', readme, () => (
  <Calendar style={styles} />
))

addStory('custom date format', readme, () => (
  <Calendar style={styles} displayFormat='YYYY/MM/D' />
))

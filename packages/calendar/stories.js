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
  display: 'inline-block',
  left: '1px',
  marginRight: '30px'
}

// Stories

addStory('default', readme, () => (
  <Calendar style={styles} />
))

addStory('custom date format', readme, () => (
  <div>
    <Calendar style={styles} displayFormat='YYYY/MM/D' />
    <Calendar style={styles} displayFormat='DD-MM-YYYY' />
    <Calendar style={styles} displayFormat='ddd MM YY' />
  </div>
))

addStory('custom placeholder', readme, () => (
  <Calendar style={styles} placeholder='Enter date' />
))

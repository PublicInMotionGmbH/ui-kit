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
  left: '1px'
}

// Stories

addStory('default', readme, () => (
  <Calendar style={styles} />
))

addStory('custom date format', readme, () => (
  <Calendar style={styles} displayFormat='YYYY/MM/D' />
))

addStory('two calendars', readme, () => (
  <div>
    <Calendar style={styles} />
    <Calendar style={styles} />
  </div>
))

addStory('different language', readme, () => (
  <Calendar style={styles} lang='pl' />
))

addStory('custom placeholder', readme, () => (
  <Calendar style={styles} placeholder='Enter date' />
))

addStory('text RTL', readme, () => (
  <Calendar style={styles} placeholder='Enter date' isRTL />
))

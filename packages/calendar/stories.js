import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import moment from 'moment'

import Calendar from './src/Calendar'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Calendar', module)

// Styles for stories
const styles = {
  position: 'relative',
  display: 'inline-block',
  left: '100px',
  marginRight: '30px'
}

// Stories

addStory('default', readme, () => (
  <Calendar style={styles} />
))

addStory.controlled('controlled', readme, (setState, state) => (
  <div>
    <Calendar
      style={styles}
      placeholder='DD-MM-YYYY'
      onChange={value => setState({ value })}
      value={state.value}
    />
  </div>
), () => ({ value: moment().format('YYYY-MM-DD') }))

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

addStory('with label', readme, () => (
  <div>
    <label htmlFor='calendar'>Click me</label>
    <Calendar id='calendar' style={styles} placeholder='Enter date' />
  </div>
))

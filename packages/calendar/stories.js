import React from 'react'
import { action } from '@storybook/addon-actions'
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

const change = action('change')

// Stories

addStory('default', readme, () => (
  <Calendar style={styles} onChange={change} />
))

addStory.controlled('controlled', readme, (setState, state) => (
  <div>
    <Calendar
      style={styles}
      placeholder='YYYY-MM-DD'
      onChange={value => setState({ value })}
      value={state.value}
    />
  </div>
), () => ({ value: moment().format('YYYY-MM-DD') }))

addStory('custom date format', readme, () => (
  <div>
    <Calendar style={styles} displayFormat='YYYY/MM/DD' onChange={change} />
    <Calendar style={styles} displayFormat='DD-MM-YYYY' onChange={change} />
    <Calendar style={styles} displayFormat='ddd MM YY' onChange={change} />
  </div>
))

addStory('custom placeholder', readme, () => (
  <Calendar style={styles} placeholder='Enter date (YYYY-MM-DD)' onChange={change} />
))

addStory('with label', readme, () => (
  <div>
    <label htmlFor='calendar'>Click me</label>
    <Calendar
      id='calendar'
      style={styles}
      placeholder='Enter date (YYYY-MM-DD)'
      onChange={change}
    />
  </div>
))

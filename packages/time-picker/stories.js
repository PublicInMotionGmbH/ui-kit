import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import TimePicker from './src/TimePicker'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Time Picker', module, {
  propTables: [ TimePicker ]
})

const spanStyle = { display: 'inline-block', margin: '16px' }

// Stories

addStory('initial', readme, () => (
  <TimePicker />
))

addStory('with passed value', readme, () => (
  <TimePicker value={new Date('2017')} />
))

addStory.controlled('12', readme, (setState, state) => (
  <div>
    <span style={spanStyle}>
      Time: <strong>{state.time}</strong>
    </span>
    <TimePicker
      hourFormat='hh A'
      onChange={time => setState({time: new Date(time).toTimeString()})}
    />
  </div>
), () => ({ time: '' }))

addStory.controlled('24', readme, (setState, state) => (
  <div>
    <span style={spanStyle}>
      Time: <strong>{state.time}</strong>
    </span>
    <TimePicker
      hourFormat='HH'
      onChange={time => setState({time: new Date(time).toTimeString()})}
    />
  </div>
), () => ({ time: '' }))

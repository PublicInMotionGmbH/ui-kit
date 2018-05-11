import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import TimePicker from './src/TimePicker'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Time Picker', module, {
  propTables: [ TimePicker ]
})

const handleChange = (value, setState) => {
  const time = new Date(value).toTimeString()
  setState({ time })
}

const spanStyle = { display: 'inline-block', marginBottom: '16px' }

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
      onChange={(value) => handleChange(value, setState)}
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
      onChange={() => handleChange(setState)}
    />
  </div>
), () => ({ time: '' }))

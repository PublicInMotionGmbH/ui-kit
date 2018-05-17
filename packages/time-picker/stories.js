import React from 'react'

import { action } from '@storybook/addon-actions'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import TimePicker from './src/TimePicker'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Time Picker', module, {
  propTables: [ TimePicker ]
})

const change = action('change')
const spanStyle = { display: 'inline-block', marginBottom: '16px' }

// Stories

addStory('initial', readme, () => (
  <TimePicker onChange={change} />
))

addStory('with passed value', readme, () => (
  <TimePicker value='13:25' onChange={change} />
))

addStory.controlled('12', readme, (setState, state) => (
  <div>
    <span style={spanStyle}>
      Time: <strong>{state.time}</strong>
    </span>
    <TimePicker
      hourFormat='12'
      onChange={(time) => setState({ time })}
    />
  </div>
), () => ({ time: '' }))

addStory.controlled('24', readme, (setState, state) => (
  <div>
    <span style={spanStyle}>
      Time: <strong>{state.time}</strong>
    </span>
    <TimePicker
      hourFormat='24'
      onChange={(time) => setState({ time })}
    />
  </div>
), () => ({ time: '' }))

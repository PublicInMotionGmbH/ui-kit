import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import PhoneInput from './src/PhoneInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('PhoneInput', module, {
  propTables: [ PhoneInput ]
})

// Stories

addStory('initial', readme, () => (
  <PhoneInput />
))

addStory('with placeholder', readme, () => (
  <PhoneInput placeholder='Type your phone number...' />
))

addStory('with error', readme, () => (
  <PhoneInput error />
))

addStory.controlled('controlled', readme, (setState, state) => (
  <PhoneInput
    value={state.value}
    onChange={value => setState({ value })}
  />
), () => ({ value: '' }))

addStory('RTL: initial', readme, () => (
  <div dir='rtl'>
    <PhoneInput />
  </div>
))

addStory('with label', readme, () => (
  <div>
    <label htmlFor='phone-input'>Click me</label>
    <PhoneInput id='phone-input' />
  </div>
))

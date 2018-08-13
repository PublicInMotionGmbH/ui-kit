import React from 'react'
import { action } from '@storybook/addon-actions'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { CountryFlagsProvider } from '@talixo/country-flag'

import PhoneInput from './src/PhoneInput'

const spriteUrl = require('@talixo/country-flag/sprites/sprite.svg')

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('PhoneInput', module, {
  propTables: [ PhoneInput ]
})

// Stories

addStory('initial', readme, () => (
  <CountryFlagsProvider url={spriteUrl}>
    <PhoneInput />
  </CountryFlagsProvider>
))

addStory('with placeholder', readme, () => (
  <CountryFlagsProvider url={spriteUrl}>
    <PhoneInput placeholder='Type your phone number...' />
  </CountryFlagsProvider>
))

addStory('with error', readme, () => (
  <CountryFlagsProvider url={spriteUrl}>
    <PhoneInput error />
  </CountryFlagsProvider>
))

addStory.controlled('controlled', readme, (setState, state) => (
  <CountryFlagsProvider url={spriteUrl}>
    <PhoneInput
      onFocus={action('focus')}
      onBlur={action('blur')}
      value={state.value}
      onChange={value => setState({ value })}
    />
  </CountryFlagsProvider>
), () => ({ value: '' }))

addStory('RTL: initial', readme, () => (
  <CountryFlagsProvider url={spriteUrl}>
    <div dir='rtl'>
      <PhoneInput />
    </div>
  </CountryFlagsProvider>
))

addStory('with label', readme, () => (
  <div>
    <label htmlFor='phone-input'>Click me</label>
    <PhoneInput id='phone-input' />
  </div>
))

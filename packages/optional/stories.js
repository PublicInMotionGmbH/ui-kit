import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { NumberInput } from '@talixo/number-input'
import { Textarea } from '@talixo/textarea'

import Optional from './src/Optional'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Optional', module, {
  propTables: [ Optional ]
})

// Stories

addStory('initial', readme, () => (
  <Optional name='request' label='I have a special request'>
    <Textarea />
  </Optional>
))

// addStory('initially open', readme, () => (
//   <Optional
//     name='request'
//     label='I have a special request'
//     open
//   />
// ))

addStory('disabled', readme, () => (
  <Optional
    name='request'
    label='I have a special request'
    disabled
  >
    <Textarea placeholder='Write your request here...' />
  </Optional>
))

addStory('disabled with value', readme, () => (
  <Optional
    name='request'
    label='I have a special request'
    value='Something'
    disabled
  >
    <Textarea placeholder='Write your request here...' />
  </Optional>
))

addStory('read only', readme, () => (
  <Optional
    name='request'
    label='I have a special request'
    value='Can`t change this text'
    readOnly
  >
    <Textarea placeholder='Write your request here...' />
  </Optional>
))

addStory('controlled with static value', readme, () => (
  <Optional
    name='request'
    label='I have a special request'
    value='Please be on time'
  >
    <Textarea />
  </Optional>
))

addStory('with custom element', readme, () => (
  <Optional
    name='request'
    label='I would like to apply insurance for few persons'
  >
    <NumberInput placeholder='How many persons?' suffix='persons' />
  </Optional>
))

addStory.controlled('handle on change', readme, (setState, state) => (
  <div>
    <strong>Value:</strong> {JSON.stringify(state.value)}
    <br /><br />

    <Optional
      name='request'
      label='I have a special request'
      value={state.active}
      onChange={(value) => setState({ value })}
    >
      <Textarea />
    </Optional>
  </div>
), () => ({ value: null }))

addStory.controlled('changed from outside', readme, (setState, state) => (
  <div>
    <strong>Value:</strong> {JSON.stringify(state.value)}
    <br /><br />

    <button onClick={() => setState({ value: null })}>Remove value</button>
    <button onClick={() => setState({ value: '' })}>Set empty value</button>
    <button onClick={() => setState({ value: 'blabla' })}>Set "blabla"</button>
    <button onClick={() => setState({ value: 'bring a bottle of water' })}>Set "bring a bottle"</button>
    <br /><br />

    <Optional
      name='request'
      label='I have a special request'
      value={state.value}
      onChange={(value) => setState({ value })}
    >
      <Textarea />
    </Optional>
  </div>
), () => ({ value: null }))

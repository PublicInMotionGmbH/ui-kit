import React from 'react'
import { action } from '@storybook/addon-actions'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import NumberInput from './src/NumberInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('NumberInput', module, {
  propTables: [ NumberInput ]
})

const change = action('change')

// Stories

addStory('default', readme, () => (
  <div>
    <h2>Default number input</h2>
    <NumberInput onChange={change} />
    <h2>Default number input with initial value</h2>
    <NumberInput onChange={change} value={15} />
    <h2>Number input with errors</h2>
    <NumberInput onChange={change} error />
  </div>
))

addStory.controlled('controlled', readme, (setState, state) => (
  <div style={{ width: 300 }}>
    <h2>Default number input</h2>
    <NumberInput onChange={value => setState({ value })} value={state.value} />
  </div>
), () => ({ value: 0 }))

addStory('small', readme, () => (
  <div>
    <h2>Small number input</h2>
    <NumberInput onChange={change} size='small' />
    <h2>Small number input with initial value</h2>
    <NumberInput onChange={change} size='small' value={15} />
    <h2>Small number input with errors</h2>
    <NumberInput onChange={change} size='small' error />
  </div>
))

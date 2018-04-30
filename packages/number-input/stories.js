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

addStory('controlled', readme, ({ value = 0 }, setState) => (
  <div style={{ width: 300 }}>
    <h2>Controlled number input</h2>
    <NumberInput onChange={value => setState({ value })} value={value} />
  </div>
))

addStory('min/max', readme, ({ value = 0 }, setState) => (
  <div style={{ width: 300 }}>
    <h2>Number input with min/max</h2>

    <NumberInput
      onChange={value => setState({ value })}
      value={value}
      min={0}
      max={8}
    />
  </div>
))

addStory('precision', readme, ({ value = 0 }, setState) => (
  <div style={{ width: 300 }}>
    <h2>Number input with 0.01 precision</h2>

    <NumberInput
      onChange={value => setState({ value })}
      value={value}
      precision={2}
    />
  </div>
))

addStory('precision and step', readme, ({ value = 0 }, setState) => (
  <div style={{ width: 300 }}>
    <h2>Number input with 0.01 precision and step</h2>

    <NumberInput
      onChange={value => setState({ value })}
      value={value}
      step={0.01}
      precision={2}
    />
  </div>
))

addStory('faster buttons', readme, ({ value = 0 }, setState) => (
  <div style={{ width: 300 }}>
    <h2>Number input with faster buttons</h2>

    <NumberInput
      onChange={value => setState({ value })}
      value={value}
      initialTime={0}
      stepTime={30}
    />
  </div>
))

addStory('without stepper', readme, ({ value = 0 }, setState) => (
  <div style={{ width: 300 }}>
    <h2>Number input without stepper buttons</h2>

    <NumberInput
      onChange={value => setState({ value })}
      value={value}
      switcher={false}
    />
  </div>
))

addStory('RTL', readme, ({ value = 0 }, setState) => (
  <div style={{ width: 300 }} dir='rtl'>
    <h2>RTL: number input</h2>
    <NumberInput onChange={value => setState({ value })} value={value} />
  </div>
))

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

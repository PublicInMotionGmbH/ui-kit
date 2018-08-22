import React from 'react'
import { action } from '@storybook/addon-actions'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { Icon } from '@talixo/icon'

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

addStory('disabled', readme, () => (
  <div>
    <h2>Disabled number input</h2>
    <NumberInput onChange={change} disabled />
    <h2>Disabled number input with initial value</h2>
    <NumberInput onChange={change} value={15} disabled />
  </div>
))

addStory('read-only', readme, () => (
  <div>
    <h2>Disabled number input</h2>
    <NumberInput onChange={change} readOnly />
    <h2>Disabled number input with initial value</h2>
    <NumberInput onChange={change} value={15} readOnly />
  </div>
))

addStory.controlled('controlled', readme, (setState, state) => (
  <div style={{ width: 300 }}>
    <h2>Controlled number input</h2>
    <NumberInput onChange={value => setState({ value })} value={state.value} />
  </div>
), () => ({ value: 0 }))

addStory.controlled('min/max', readme, (setState, state) => (
  <div style={{ width: 300 }}>
    <h2>Number input with min/max</h2>

    <NumberInput
      onChange={value => setState({ value })}
      value={state.value}
      min={0}
      max={8}
    />
  </div>
), () => ({ value: 0 }))

addStory.controlled('precision', readme, (setState, state) => (
  <div style={{ width: 300 }}>
    <h2>Number input with 0.01 precision</h2>

    <NumberInput
      onChange={value => setState({ value })}
      value={state.value}
      precision={2}
    />
  </div>
), () => ({ value: 0 }))

addStory.controlled('precision and step', readme, (setState, state) => (
  <div style={{ width: 300 }}>
    <h2>Number input with 0.01 precision and step</h2>

    <NumberInput
      onChange={value => setState({ value })}
      value={state.value}
      step={0.01}
      precision={2}
    />
  </div>
), () => ({ value: 0 }))

addStory.controlled('faster buttons', readme, (setState, state) => (
  <div style={{ width: 300 }}>
    <h2>Number input with faster buttons</h2>

    <NumberInput
      onChange={value => setState({ value })}
      value={state.value}
      initialTime={0}
      stepTime={30}
    />
  </div>
), () => ({ value: 0 }))

addStory.controlled('without stepper', readme, (setState, state) => (
  <div style={{ width: 300 }}>
    <h2>Number input without stepper buttons</h2>

    <NumberInput
      onChange={value => setState({ value })}
      value={state.value}
      stepper={false}
    />
  </div>
), () => ({ value: 0 }))

addStory.controlled('with icon & without stepper', readme, (setState, state) => (
  <div style={{ width: 300 }}>
    <h2>Number input with icon and without stepper buttons</h2>

    <NumberInput
      onChange={value => setState({ value })}
      value={state.value}
      left={<Icon name='credit_card' />}
      stepper={false}
    />
  </div>
), () => ({ value: 0 }))

addStory.controlled('with icon', readme, (setState, state) => (
  <div style={{ width: 300 }}>
    <h2>Number input with icon</h2>

    <NumberInput
      onChange={value => setState({ value })}
      value={state.value}
      left={<Icon name='credit_card' />}
    />
  </div>
), () => ({ value: 0 }))

addStory.controlled('RTL: with icon', readme, (setState, state) => (
  <div style={{ width: 300 }} dir='rtl'>
    <h2>RTL: Number input with icon</h2>

    <NumberInput
      onChange={value => setState({ value })}
      value={state.value}
      left={<Icon name='credit_card' />}
    />
  </div>
), () => ({ value: 0 }))

addStory.controlled('RTL: with icon & without stepper', readme, (setState, state) => (
  <div style={{ width: 300 }} dir='rtl'>
    <h2>RTL: Number input with icon and without stepper buttons</h2>

    <NumberInput
      onChange={value => setState({ value })}
      value={state.value}
      left={<Icon name='credit_card' />}
      stepper={false}
    />
  </div>
), () => ({ value: 0 }))

addStory.controlled('RTL', readme, (setState, state) => (
  <div style={{ width: 300 }} dir='rtl'>
    <h2>RTL: number input</h2>
    <NumberInput onChange={value => setState({ value })} value={state.value} />
  </div>
), () => ({ value: 0 }))

addStory('with label', readme, () => (
  <div style={{ width: 300 }}>
    <label htmlFor='number-input'>Click me</label>
    <NumberInput id='number-input' />
  </div>
))

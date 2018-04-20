import React from 'react'
import { action } from '@storybook/addon-actions'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { Icon } from '@talixo/icon'
import { ProgressBar } from '@talixo/progress-bar'

import TextInput from './src/TextInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Text Input', module, {
  propTables: [ TextInput ]
})

const change = action('change')

// Stories

const additionalStyling = {
  display: 'block',
  marginTop: '10px'
}

addStory('default', readme, () => (
  <div>
    <h2>Default text input</h2>
    <TextInput
      placeholder='Default input'
      style={additionalStyling}
      onChange={change}
    />
    <h2>Default text input with error </h2>
    <TextInput
      placeholder='Default input with errors'
      style={additionalStyling}
      onChange={change}
      hasError
    />
  </div>
))

addStory.controlled('controlled', readme, (setState, state) => (
  <div style={{ width: 300 }}>
    <TextInput
      placeholder='Some placeholder'
      style={additionalStyling}
      value={state.value}
      onChange={value => setState({ value })}
    />
  </div>
), () => ({ value: '' }))

addStory.controlled('with icon', readme, (setState, state) => (
  <div style={{ width: 300 }}>
    <TextInput
      placeholder='Icon on left'
      left={<Icon name='lock' />}
      style={additionalStyling}
      value={state.value}
      onChange={value => setState({ value })}
    />

    <TextInput
      placeholder='Icon on right'
      right={<Icon name='warning' />}
      style={additionalStyling}
      value={state.value}
      onChange={value => setState({ value })}
    />

    <TextInput
      placeholder='Both icons'
      left={<Icon name='lock' />}
      right={<Icon name='warning' />}
      style={additionalStyling}
      value={state.value}
      onChange={value => setState({ value })}
    />
  </div>
), () => ({ value: '' }))

addStory.controlled('with suffix', readme, (setState, state) => (
  <div style={{ width: 300 }}>
    <TextInput
      placeholder='How many cars would you like to have?'
      suffix='cars'
      style={additionalStyling}
      value={state.value}
      onChange={value => setState({ value })}
    />
  </div>
), () => ({ value: '0' }))

addStory.controlled('with icon and suffix', readme, (setState, state) => (
  <div style={{ width: 300 }}>
    <label>
      <input
        type='checkbox'
        onChange={e => setState({ suffix: e.target.checked ? 'cars' : null })}
        checked={!!state.suffix}
      />
      {' '}With suffix
    </label>

    <TextInput
      placeholder='Single left icon'
      left={<Icon name='directions_car' />}
      suffix={state.suffix}
      style={additionalStyling}
      value={state.value}
      onChange={value => setState({ value })}
    />

    <TextInput
      placeholder='Single right icon'
      right={<Icon name='directions_car' />}
      suffix={state.suffix}
      style={additionalStyling}
      value={state.value}
      onChange={value => setState({ value })}
    />

    <TextInput
      placeholder='Both icons'
      left={<Icon name='directions_car' />}
      right={<Icon name='warning' />}
      suffix={state.suffix}
      style={additionalStyling}
      value={state.value}
      onChange={value => setState({ value })}
    />
  </div>
), () => ({ value: 0, suffix: 'cars' }))

addStory.controlled('with icon and special suffix', readme, (setState, state) => {
  const suffix = (
    <span>
      happy <strong>users</strong> <Icon name='face' /><Icon name='favorite' /><Icon name='mobile_apps' />
    </span>
  )

  const value = Math.max(0, Math.min(1, state.value.length / 10))

  const progressType = value > 0.8
    ? 'success'
    : value > 0.4 ? 'warning' : 'error'

  const progress = (
    <ProgressBar
      type={progressType}
      value={value}
      style={{ width: 50, display: 'inline-block' }}
    >
      {(100 * value) + '%'}
    </ProgressBar>
  )

  return (
    <div style={{ width: 300 }}>
      <TextInput
        placeholder='Single left icon'
        left={<Icon name='directions_car' />}
        suffix={suffix}
        style={additionalStyling}
        value={state.value}
        onChange={value => setState({value})}
      />

      <TextInput
        placeholder='Single right icon'
        right={<Icon name='directions_car' />}
        suffix={suffix}
        style={additionalStyling}
        value={state.value}
        onChange={value => setState({value})}
      />

      <TextInput
        placeholder='Both icons'
        left={<Icon name='directions_car' />}
        right={<Icon name='warning' />}
        suffix={suffix}
        style={additionalStyling}
        value={state.value}
        onChange={value => setState({value})}
      />

      <TextInput
        placeholder='Single left icon'
        left={<Icon name='directions_car' />}
        suffix={progress}
        style={additionalStyling}
        value={state.value}
        onChange={value => setState({value})}
      />

      <TextInput
        placeholder='Single right icon'
        right={<Icon name='directions_car' />}
        suffix={progress}
        style={additionalStyling}
        value={state.value}
        onChange={value => setState({value})}
      />

      <TextInput
        placeholder='Both icons'
        left={<Icon name='directions_car' />}
        right={<Icon name='warning' />}
        suffix={progress}
        style={additionalStyling}
        value={state.value}
        onChange={value => setState({value})}
      />
    </div>
  )
}, () => ({ value: '2' }))

addStory.controlled('small with icon and suffix', readme, (setState, state) => (
  <div style={{ width: 300 }}>
    <TextInput
      size='small'
      placeholder='Single left icon'
      left={<Icon name='directions_car' />}
      suffix='cars'
      style={additionalStyling}
      value={state.value}
      onChange={value => setState({ value })}
    />

    <TextInput
      size='small'
      placeholder='Single right icon'
      right={<Icon name='directions_car' />}
      suffix='cars'
      style={additionalStyling}
      value={state.value}
      onChange={value => setState({ value })}
    />

    <TextInput
      size='small'
      placeholder='Both icons'
      left={<Icon name='directions_car' />}
      right={<Icon name='warning' />}
      suffix='cars'
      style={additionalStyling}
      value={state.value}
      onChange={value => setState({ value })}
    />
  </div>
), () => ({ value: 0 }))

addStory('small', readme, () => (
  <div>
    <h2>Small text input</h2>
    <TextInput
      placeholder='Small text input'
      size='small'
      style={additionalStyling}
      onChange={change}
    />
    <h2>Small text input with error</h2>
    <TextInput
      placeholder='Small text input with errors'
      size='small'
      style={additionalStyling}
      onChange={change}
      hasError
    />
  </div>
))

import React from 'react'
import { action } from '@storybook/addon-actions'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { Icon } from '@talixo/icon'
import { ProgressBar } from '@talixo/progress-bar'
import TextMaskInput from 'react-text-mask'

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
      error
    />
    <h2>Default text input readonly </h2>
    <TextInput
      placeholder="You can't write here"
      style={additionalStyling}
      onChange={change}
      readOnly
      value="You can't change this text"
    />
  </div>
))

addStory('disabled', readme, () => (
  <div>
    <h2>Default text input disabled </h2>
    <TextInput
      placeholder='Default disabled input'
      style={additionalStyling}
      disabled
    />
    <h2>Text input disabled with icon</h2>
    <TextInput
      left={<Icon name='credit_card' />}
      placeholder='Not allowed to type here'
      style={additionalStyling}
      disabled
    />
  </div>
))

addStory.controlled('masked / different input', readme, (setState, state) => (
  <div>
    <h2>Masked input</h2>
    <TextInput
      value={state.value}
      left={<Icon name='credit_card' />}
      InputComponent={TextMaskInput}
      mask={[
        // Credit card has 13-19 digits
        /\d/, /\d/, /\d/, /\d/, ' ',
        /\d/, /\d/, /\d/, /\d/, ' ',
        /\d/, /\d/, /\d/, /\d/, ' ',
        /\d/, /\d/, /\d/, /\d/, ' ',
        /\d/, /\d/, /\d/
      ]}
      placeholderChar={'\u2000'}
      placeholder='Type your credit card number.'
      style={additionalStyling}
      onChange={value => setState({ value })}
    />
  </div>
), () => ({ value: '' }))

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

addStory.controlled('RTL: with icon and suffix', readme, (setState, state) => {
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
    <div style={{ width: 300 }} dir='rtl'>
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

addStory('put caret always on end', readme, () => (
  <div>
    <h2>Text input with caret on end on focus</h2>
    <TextInput
      placeholder='Default input'
      style={additionalStyling}
      onChange={change}
      endCaretOnFocus
    />
  </div>
))

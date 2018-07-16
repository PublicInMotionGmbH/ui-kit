import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { action } from '@storybook/addon-actions'

import RadioGroup from './src/RadioGroup'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('RadioGroup', module, {
  propTables: [RadioGroup]
})

// Helpers
const change = action('onChange')
function CustomComponent (props) {
  return <input type='text' onFocus={props.onFocus} onChange={props.onChange} />
}

// Mocks
const options = [{ value: 'option_1', label: 'one' }, { value: 'option_2', label: 'two' }, { value: 'option_3', label: 'three' }]
const disabledOptions = [{ value: 'option_1', label: 'one', disabled: true }, { value: 'option_2', label: 'two' }, { value: 'option_3', label: 'three' }]

// Stories

addStory('initial', readme, () => (
  <RadioGroup
    onChange={change}
    name='RadioName'
    options={options}
  />
))

addStory('vertical', readme, () => (
  <RadioGroup
    onChange={change}
    name='RadioName'
    options={options}
    vertical
  />
))

addStory.controlled('with default value', readme, (setState, state) => (
  <RadioGroup
    onChange={value => setState({ value })}
    name='RadioNameChecked'
    value={state.value}
    options={options}
  />
), () => ({ value: 'option_1' }))

addStory.controlled('with different size', readme, (setState, state) => (
  <div>
    <h2>Small size</h2>
    <RadioGroup
      onChange={value => setState({value})}
      name='RadioName1'
      size='small'
      value={state.value}
      options={options}
    />
    <h2>Large size</h2>
    <RadioGroup
      onChange={value2 => setState({ value2 })}
      name='RadioName2'
      size='large'
      value={state.value2}
      options={options}
    />
  </div>
), () => ({ value: 'option_1', value2: 'option_2' }))

addStory.controlled('with disabled option', readme, (setState, state) => (
  <RadioGroup
    onChange={value => setState({ value })}
    name='RadioNameDisabled'
    value={state.value}
    options={disabledOptions}
  />
), () => ({ value: 'option_3' }))

addStory.controlled('with custom option', readme, (setState, state) => (
  <div>
    <h2>Horizontal</h2>
    <RadioGroup
      allowCustom
      customPlaceholder='Other'
      onChange={value => setState({ value })}
      name='radioCustom'
      value={state.value}
      options={options}
    />
    <h2>Vertical</h2>
    <RadioGroup
      allowCustom
      customPlaceholder='Other'
      onChange={value => setState({ value })}
      name='radioCustomVertical'
      value={state.value}
      options={options}
      vertical
    />
  </div>
), () => ({ value: 'option_3' }))

addStory.controlled('with custom option component', readme, (setState, state) => (
  <RadioGroup
    allowCustom
    customComponent={CustomComponent}
    onChange={value => setState({ value })}
    name='radioCustomComponent'
    value={state.value}
    options={options}
  />
), () => ({ value: 'option_3' }))

addStory('with label', readme, () => (
  <div>
    <label htmlFor='radio-group'>Click me</label>
    <RadioGroup
      id='radio-group'
      options={[
        { value: 1, label: 'one' },
        { value: 2, label: 'two' },
        { value: 3, label: 'three' }
      ]}
    />
  </div>
))

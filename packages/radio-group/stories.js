import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import {action} from '@storybook/addon-actions'

import RadioGroup from './src/RadioGroup'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('RadioGroup', module, {
  propTables: [ RadioGroup ]
})

// Helpers
const change = action('onChange')
const customChange = action('onCustomChange')

// Stories

addStory('initial', readme, () => (
  <RadioGroup
    onChange={change}
    name='RadioName'
    options={[{ value: 'option_1', label: 'one' }, { value: 'option_2', label: 'two' }, { value: 'option_3', label: 'three' }]}
  />
))

addStory.controlled('with default value', readme, (setState, state) => (
  <RadioGroup
    onChange={value => setState({value})}
    name='RadioNameChecked'
    value={state.value}
    options={[{ value: 'option_1', label: 'one' }, { value: 'option_2', label: 'two' }, { value: 'option_3', label: 'three' }]}
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
      options={[{ value: 'option_1', label: 'one' }, { value: 'option_2', label: 'two' }, { value: 'option_3', label: 'three' }]}
    />
    <h2>Large size</h2>
    <RadioGroup
      onChange={value2 => setState({value2})}
      name='RadioName2'
      size='large'
      value={state.value2}
      options={[{ value: 'option_1', label: 'one' }, { value: 'option_2', label: 'two' }, { value: 'option_3', label: 'three' }]}
    />
  </div>
), () => ({ value: 'option_1', value2: 'option_2' }))

addStory.controlled('with disabled option', readme, (setState, state) => (
  <RadioGroup
    onChange={value => setState({value})}
    name='RadioNameDisabled'
    value={state.value}
    options={[{ value: 'option_1', label: 'one', disabled: true }, { value: 'option_2', label: 'two' }, { value: 'option_3', label: 'three' }]}
  />
), () => ({ value: 'option_3' }))

addStory.controlled('with custom option', readme, (setState, state) => (
  <RadioGroup
    allowCustom
    onChange={value => setState({value})}
    onCustomChange={customChange}
    name='radioCustom'
    value={state.value}
    options={[{ value: 'option_1', label: 'one' }, { value: 'option_2', label: 'two' }, { value: 'option_3', label: 'three' }]}
  />
), () => ({ value: 'option_3' }))

addStory.controlled('with custom option and component', readme, (setState, state) => (
  <RadioGroup
    allowCustom
    customComponent={<input type='text' />}
    onChange={value => setState({value})}
    onCustomChange={customChange}
    name='radioCustomComponent'
    value={state.value}
    options={[{ value: 'option_1', label: 'one' }, { value: 'option_2', label: 'two' }, { value: 'option_3', label: 'three' }]}
  />
), () => ({ value: 'option_3' }))

import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import RadioGroup from './src/RadioGroup'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('RadioGroup', module, {
  propTables: [ RadioGroup ]
})

// Stories

addStory.controlled('initial', readme, (setState, state) => (
  <RadioGroup
    onChange={value => setState({ value })}
    name='RadioName' value={state.value}
    options={[{value: 1, label: 'one'}, {value: 2, label: 'two'}, {value: 3, label: 'three'}]}
  />
))

addStory.controlled('with default value', readme, (setState, state) => (
  <RadioGroup
    onChange={value => setState({ value })}
    name='RadioNameChecked'
    value={state.value}
    options={[{value: 1, label: 'one'}, {value: 2, label: 'two'}, {value: 3, label: 'three'}]}
  />
), () => ({value: 1}))

addStory.controlled('with different size', readme, (setState, state) => (
  <div>
    <h2>Small size</h2>
    <RadioGroup
      onChange={value => setState({ value })}
      name='RadioName1'
      size='small'
      value={state.value}
      options={[{value: 1, label: 'one'}, {value: 2, label: 'two'}, {value: 3, label: 'three'}]}
    />
    <h2>Large size</h2>
    <RadioGroup
      onChange={value2 => setState({ value2 })}
      name='RadioName2'
      size='large'
      value={state.value2}
      options={[{value: 1, label: 'one'}, {value: 2, label: 'two'}, {value: 3, label: 'three'}]}
    />
  </div>
), () => ({value: 1, value2: 2}))

addStory.controlled('with disabled option', readme, (setState, state) => (
  <RadioGroup
    onChange={value => setState({ value })}
    name='RadioNameDisabled'
    value={state.value}
    options={[{value: 1, label: 'one', disabled: true}, {value: 2, label: 'two'}, {value: 3, label: 'three'}]}
  />
), () => ({value: 3}))

import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { action } from '@storybook/addon-actions'

import CheckboxGroup from './src/CheckboxGroup'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('CheckboxGroup', module, {
  propTables: [ CheckboxGroup ]
})

const change = action('change')

// Stories

addStory('initial', readme, () => (
  <CheckboxGroup
    name='CheckboxName'
    onChange={change}
    options={[
      { value: 1, label: 'one' },
      { value: 2, label: 'two' },
      { value: 3, label: 'three' }
    ]}
  />
))

addStory.controlled('controlled', readme, (setState, state) => (
  <CheckboxGroup
    onChange={value => setState({ value })}
    name='CheckboxNameChecked'
    value={state.value}
    options={[
      { value: 1, label: 'one' },
      { value: 2, label: 'two' },
      { value: 3, label: 'three' }
    ]}
  />
), () => ({ value: [ 1 ] }))

addStory('with error', readme, () => (
  <div>
    <CheckboxGroup
      error
      onChange={change}
      name='CheckboxName1'
      options={[
        { value: 1, label: 'one' },
        { value: 2, label: 'two' },
        { value: 3, label: 'three' }
      ]}
    />
  </div>
))

addStory('with fixed value', readme, () => (
  <div>
    <CheckboxGroup
      value={[ 1 ]}
      onChange={change}
      name='CheckboxName1'
      options={[
        { value: 1, label: 'one' },
        { value: 2, label: 'two' },
        { value: 3, label: 'three' }
      ]}
    />
  </div>
))

addStory('with disabled option', readme, () => (
  <CheckboxGroup
    onChange={change}
    name='CheckboxNameDisabled'
    options={[
      { value: 1, label: 'one', disabled: true },
      { value: 2, label: 'two' },
      { value: 3, label: 'three' }
    ]}
  />
))

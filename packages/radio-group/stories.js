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

addStory('initial', readme, () => (
  <RadioGroup
    name='RadioName'
    options={[
      { value: 1, label: 'one' },
      { value: 2, label: 'two' },
      { value: 3, label: 'three' }
    ]}
  />
))

addStory.controlled('controlled', readme, (setState, state) => (
  <RadioGroup
    onChange={value => setState({ value })}
    name='RadioNameChecked'
    value={state.value}
    options={[
      { value: 1, label: 'one' },
      { value: 2, label: 'two' },
      { value: 3, label: 'three' }
    ]}
  />
), () => ({ value: 1 }))

addStory('with error', readme, () => (
  <div>
    <RadioGroup
      error
      name='RadioName1'
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
    <RadioGroup
      value={1}
      name='RadioName1'
      options={[
        { value: 1, label: 'one' },
        { value: 2, label: 'two' },
        { value: 3, label: 'three' }
      ]}
    />
  </div>
))

addStory('with disabled option', readme, () => (
  <RadioGroup
    name='RadioNameDisabled'
    options={[
      { value: 1, label: 'one', disabled: true },
      { value: 2, label: 'two' },
      { value: 3, label: 'three' }
    ]}
  />
))

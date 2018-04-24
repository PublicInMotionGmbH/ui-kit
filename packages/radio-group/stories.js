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
  <RadioGroup name='RadioName' options={[{value: 1, label: 'one'}, {value: 2, label: 'two'}, {value: 3, label: 'three'}]} />
))

addStory('with default value', readme, () => (
  <RadioGroup name='RadioName' value={2} options={[{value: 1, label: 'one'}, {value: 2, label: 'two'}, {value: 3, label: 'three'}]} />
))

addStory('with different size', readme, () => (
  <div>
    <h2>Small size</h2>
    <RadioGroup name='RadioName1' size='small' value={2} options={[{value: 1, label: 'one'}, {value: 2, label: 'two'}, {value: 3, label: 'three'}]} />
    <h2>Large size</h2>
    <RadioGroup name='RadioName2' size='large' value={2} options={[{value: 1, label: 'one'}, {value: 2, label: 'two'}, {value: 3, label: 'three'}]} />
  </div>
))

addStory('with disabled buttons', readme, () => (
  <RadioGroup name='RadioName' value={3} options={[{value: 1, label: 'one'}, {value: 2, label: 'two'}, {value: 3, label: 'three'}, {value: 4, label: 'four'}]} disabled={[1, 2]} />
))

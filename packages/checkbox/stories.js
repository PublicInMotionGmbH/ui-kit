import React from 'react'

import Checkbox from './src/Checkbox'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { action } from '@storybook/addon-actions'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Checkbox', module)
const change = action('change')

addStory('simple', readme, () => (
  <div>
    <div><Checkbox onChange={change}>simple</Checkbox></div>
    <div><Checkbox size='large' onChange={change}>large label</Checkbox></div>
    <div><Checkbox size='small' onChange={change}>small label</Checkbox></div>
  </div>
))

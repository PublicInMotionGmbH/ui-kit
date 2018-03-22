import React from 'react'

import Checkbox from './src/Checkbox'

import {
  createStoriesFactory,
  getReadmeDescription
} from '@talixo/commons/story'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Checkbox', module)

addStory('simple', readme, () => (
  <div>
    <div><Checkbox>simple</Checkbox></div>
    <div><Checkbox size='large'>large label</Checkbox></div>
    <div><Checkbox size='small'>small label</Checkbox></div>
  </div>
))

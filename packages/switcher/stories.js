import React from 'react'

import Switcher from './src/Switcher'

import {
  createStoriesFactory,
  getReadmeDescription
} from '@talixo/shared/story'
import { action } from '@storybook/addon-actions'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Switcher', module)
const change = action('change')

addStory('all options', readme, () =>
  <div>
    <h2>Default</h2>
    <Switcher onChange={change} />
    <h2>Default checked</h2>
    <Switcher onChange={change} defaultChecked />
    <h2>Always checked</h2>
    <Switcher onChange={change} checked />
    <h2>Disabled</h2>
    <Switcher onChange={change} disabled />
    <h2>Disabled and checked</h2>
    <Switcher onChange={change} disabled checked />
  </div>
)

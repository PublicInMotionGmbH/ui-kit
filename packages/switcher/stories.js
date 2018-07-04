import React from 'react'
import { action } from '@storybook/addon-actions'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { Icon } from '@talixo/icon'

import Switcher from './src/Switcher'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Switcher', module, {
  propTables: [ Switcher ]
})

const change = action('change')

addStory('basic', readme, () => (
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
))

const labels = {
  yesLabel: <Icon name='done' />,
  noLabel: <Icon name='close' />
}

addStory('with icons', readme, () => (
  <div>
    <h2>Default</h2>
    <Switcher {...labels} onChange={change} />
    <h2>Default checked</h2>
    <Switcher {...labels} onChange={change} defaultChecked />
    <h2>Always checked</h2>
    <Switcher {...labels} onChange={change} checked />
    <h2>Disabled</h2>
    <Switcher {...labels} onChange={change} disabled />
    <h2>Disabled and checked</h2>
    <Switcher {...labels} onChange={change} disabled checked />
  </div>
))

addStory('with label', readme, () => (
  <div>
    <label htmlFor='switcher'>Click me</label>
    <Switcher id='switcher' {...labels} onChange={change} />
  </div>
))

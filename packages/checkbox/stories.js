import React from 'react'
import { action } from '@storybook/addon-actions'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Checkbox from './src/Checkbox'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Checkbox', module, {
  propTables: [ Checkbox ]
})

const change = action('change')

addStory('default', readme, () => (
  <div>
    <Checkbox onChange={change}>Default</Checkbox>
    <Checkbox onChange={change} defaultChecked>Default checked</Checkbox>
    <Checkbox onChange={change} disabled>Default disabled</Checkbox>
    <Checkbox onChange={change} defaultChecked disabled>
      Default checked and disabled
    </Checkbox>
  </div>
))

addStory('small label', readme, () => (
  <div>
    <Checkbox onChange={change} size='small'>Default</Checkbox>
    <Checkbox onChange={change} size='small' defaultChecked>Default checked</Checkbox>
    <Checkbox onChange={change} size='small' disabled>Default disabled</Checkbox>
    <Checkbox onChange={change} size='small' defaultChecked disabled>
      Default checked and disabled
    </Checkbox>
  </div>
))

addStory('large label', readme, () => (
  <div>
    <Checkbox onChange={change} size='large'>Default</Checkbox>
    <Checkbox onChange={change} size='large' defaultChecked>Default checked</Checkbox>
    <Checkbox onChange={change} size='large' disabled>Default disabled</Checkbox>
    <Checkbox onChange={change} size='large' defaultChecked disabled>
      Default checked and disabled
    </Checkbox>
  </div>
))

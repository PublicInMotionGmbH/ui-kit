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
    <Checkbox onChange={change} error>
      Default with error
    </Checkbox>
    <Checkbox onChange={change} disabled>Default disabled</Checkbox>
    <Checkbox onChange={change} defaultChecked disabled>
      Default checked and disabled
    </Checkbox>
    <Checkbox onChange={change} disabled error>
      Disabled with error
    </Checkbox>
    <Checkbox onChange={change} disabled defaultChecked error>
      Disabled and checked with error
    </Checkbox>
  </div>
))

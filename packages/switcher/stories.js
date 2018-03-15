import React from 'react'

import Switcher from './src/Switcher'

import { createStoriesFactory, getReadmeDescription } from '@talixo/commons/story'
import { action } from '@storybook/addon-actions'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Switcher', module)
const change = action('change')

addStory('not controlled', readme, () => <Switcher onChange={change} />)
addStory('selected', readme, () => <Switcher onChange={change} checked />)
addStory('disabled', readme, () => <Switcher onChange={change} disabled />)
addStory('disabled & selected', readme, () => <Switcher onChange={change} disabled checked />)

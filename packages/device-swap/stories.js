import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import DeviceSwap from './src/DeviceSwap'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Device Swap', module, {
  propTables: [ DeviceSwap ]
})

// Stories

addStory('initial', readme, () => (
  <DeviceSwap
    renderDesktop={() => 'Desktop'}
    renderMobile={() => 'Mobile'}
  />
))

addStory('default view: mobile', readme, () => (
  <DeviceSwap
    defaultView='mobile'
    renderDesktop={() => 'Desktop'}
    renderMobile={() => 'Mobile'}
  />
))

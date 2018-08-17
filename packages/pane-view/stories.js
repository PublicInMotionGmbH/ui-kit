import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import PaneView from './src/PaneView'
import Pane from './src/Pane'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('PaneView', module, {
  propTables: [ PaneView ]
})

// Stories

addStory('initial', readme, () => (
  <PaneView size={300} split='vertical'>
    <div>hello</div>
    <div>you</div>
    <div>boy</div>
  </PaneView>
))

addStory('pane', readme, () => (
  <Pane size='6em' split='vertical'>hello</Pane>
))

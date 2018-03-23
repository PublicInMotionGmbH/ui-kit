import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/commons/story'

import Tooltip from './src/Tooltip'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Tooltip', module)

// Stories

addStory('default', readme, () => (
  <Tooltip color='primary' position='right' render={() => <span>Default</span>}>
    <span
      style={{
        display: 'inline-block',
        backgroundColor: '#eee',
        padding: '1rem',
        cursor: 'pointer'
      }}
    >
      Tooltip right
    </span>
  </Tooltip>
))
addStory('fade', readme, () => (
  <Tooltip color='primary' fade position='right' render={() => <span>Fade</span>}>
    <span
      style={{
        display: 'inline-block',
        backgroundColor: '#eee',
        padding: '1rem',
        cursor: 'pointer'
      }}
    >
      Tooltip right
    </span>
  </Tooltip>
))
addStory('custom fade time', readme, () => (
  <Tooltip color='primary' fade fadeTime={4000} position='right' render={() => <span>Fade 4s</span>}>
    <span
      style={{
        display: 'inline-block',
        backgroundColor: '#eee',
        padding: '1rem',
        cursor: 'pointer'
      }}
    >
      Tooltip right
    </span>
  </Tooltip>
))

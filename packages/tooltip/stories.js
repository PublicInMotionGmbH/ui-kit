import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Tooltip from './src/Tooltip'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Tooltip', module)

const tooltipStyle = {
  display: 'inline-block',
  backgroundColor: '#eee',
  padding: '1rem',
  margin: '25px 0',
  cursor: 'pointer'
}

function render (setState, state) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip
        color='primary'
        open={state.open}
        position='right'
        render={() => <span>I am controlled</span>}
      >
        <span
          style={{ ...tooltipStyle, cursor: 'default' }}
        >
          Tooltip right
        </span>
      </Tooltip>
      <span
        onClick={() => setState({ open: !state.open })}
        style={{
          ...tooltipStyle,
          backgroundColor: '#e00',
          color: '#fff',
          marginLeft: '150px'
        }}
      >
        Press me
      </span>
    </div>
  )
}

function getInitialState () {
  return {
    open: false
  }
}

// Stories

addStory('default', readme, () => (
  <Tooltip color='primary' render={() => <span>Default</span>}>
    <span
      style={tooltipStyle}
    >
      Tooltip right
    </span>
  </Tooltip>
))
addStory('left', readme, () => (
  <Tooltip color='primary' position='left' render={() => <span>Default</span>}>
    <span
      style={{ ...tooltipStyle, marginLeft: '100px' }}
    >
      Tooltip left
    </span>
  </Tooltip>
))
addStory('top', readme, () => (
  <Tooltip color='primary' position='top' render={() => <span>Default</span>}>
    <span
      style={tooltipStyle}
    >
      Tooltip top
    </span>
  </Tooltip>
))
addStory('bottom', readme, () => (
  <Tooltip color='primary' position='bottom' render={() => <span>Default</span>}>
    <span
      style={tooltipStyle}
    >
      Tooltip bottom
    </span>
  </Tooltip>
))
addStory('fade', readme, () => (
  <Tooltip color='primary' fade render={() => <span>Fade</span>}>
    <span
      style={tooltipStyle}
    >
      Tooltip right
    </span>
  </Tooltip>
))
addStory('custom fade time', readme, () => (
  <Tooltip color='primary' fade fadeTime={4000} render={() => <span>Fade 4s</span>}>
    <span
      style={tooltipStyle}
    >
      Tooltip right
    </span>
  </Tooltip>
))
addStory.controlled('controlled', readme, render, getInitialState)

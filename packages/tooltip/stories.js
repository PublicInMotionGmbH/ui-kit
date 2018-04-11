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
        isOpen={state.isOpen}
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
        onClick={() => setState({ isOpen: !state.isOpen })}
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
    isOpen: false
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
addStory('Popover', readme, () => (
  <Tooltip isPopover color='primary' render={() => <div><h3>Popover</h3></div>}>
    <span
      style={tooltipStyle}
    >
      Popover
    </span>
  </Tooltip>
))

addStory('Popover with tooltip', readme, () => (
  <Tooltip isPopover color='primary' render={() =>
    <Tooltip color='primary' render={() => <div>Tooltip</div>}>
      <span
        style={tooltipStyle}
      >
      Popover with Tooltip
      </span>
    </Tooltip>
  }>
    <span
      style={tooltipStyle}
    >
      Popover
    </span>
  </Tooltip>
))

addStory.controlled('controlled', readme, render, getInitialState)

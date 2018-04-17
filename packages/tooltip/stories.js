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
  <div>
    <Tooltip color='primary' render={() => <span>Default</span>}>
      <span
        style={tooltipStyle}
      >
      Tooltip right
      </span>
    </Tooltip>
    <Tooltip color='primary' position='left' render={() => <span>Default</span>}>
      <span
        style={{ ...tooltipStyle, marginLeft: '100px' }}
      >
      Tooltip left
      </span>
    </Tooltip>
    <Tooltip color='primary' position='top' render={() => <span>Default</span>}>
      <span
        style={{ ...tooltipStyle, marginLeft: '100px' }}
      >
      Tooltip top
      </span>
    </Tooltip>
    <Tooltip color='primary' position='bottom' render={() => <span>Default</span>}>
      <span
        style={{ ...tooltipStyle, marginLeft: '100px' }}
      >
      Tooltip bottom
      </span>
    </Tooltip>
  </div>
))

addStory('without arrow', readme, () => (
  <Tooltip isArrow={false} color='primary' render={() => <div><h3>Without arrow</h3></div>}>
    <span
      style={tooltipStyle}
    >
      Tooltip without arrow
    </span>
  </Tooltip>
))

addStory('fade', readme, () => (
  <div>
    <h2>Default fade time</h2>
    <Tooltip color='primary' fade render={() => <span>Fade</span>}>
      <span
        style={tooltipStyle}
      >
      Tooltip right
      </span>
    </Tooltip>
    <h2>Custom fade time</h2>
    <Tooltip color='primary' fade fadeTime={3000} render={() => <span>Fade 3s</span>}>
      <span
        style={tooltipStyle}
      >
      Tooltip right
      </span>
    </Tooltip>
  </div>
))

addStory('Popover', readme, () => (
  <Tooltip triggerOn='click' color='primary' render={() => <div><h3>Popover</h3></div>}>
    <span
      style={tooltipStyle}
    >
      Popover
    </span>
  </Tooltip>
))

addStory('Popover without arrow', readme, () => (
  <Tooltip triggerOn='click' isArrow={false} color='primary' render={() => <div><h3>Popover</h3></div>}>
    <span
      style={tooltipStyle}
    >
      Popover without arrow
    </span>
  </Tooltip>
))

addStory('Popover fade', readme, () => (
  <div>
    <h2>Default Popover fade time</h2>
    <Tooltip triggerOn='click' color='primary' fade render={() => <div><h3>Popover fade</h3></div>}>
      <span
        style={tooltipStyle}
      >
      Popover
      </span>
    </Tooltip>
    <h2>Custom Popover fade time</h2>
    <Tooltip triggerOn='click' color='primary' fade fadeTime={3000} render={() => <div><h3>Popover fade 3s</h3></div>}>
      <span
        style={tooltipStyle}
      >
      Popover
      </span>
    </Tooltip>
  </div>
))

addStory('Popover with tooltip', readme, () => (
  <Tooltip triggerOn='click' isArrow={false} color='primary' render={() =>
    <Tooltip color='primary' render={() => <div>Tooltip</div>}>
      <span
        style={{...tooltipStyle, backgroundColor: 'transparent'}}
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

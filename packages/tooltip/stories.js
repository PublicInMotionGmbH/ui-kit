import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Tooltip from './src/Tooltip'
import { Icon } from '@talixo/icon'

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

const iconStyle = {
  fontSize: '40px'
}

// Stories

addStory('default', readme, () => (
  <div>
    <Tooltip position='right' render={() => <span>Default</span>}>
      <span style={tooltipStyle}>
        Tooltip right
      </span>
    </Tooltip>
    <Tooltip position='left' render={() => <span>Default</span>}>
      <span style={{ ...tooltipStyle, marginLeft: '100px' }}>
        Tooltip left
      </span>
    </Tooltip>
    <Tooltip position='top' render={() => <span>Default</span>}>
      <span style={{ ...tooltipStyle, marginLeft: '100px' }}>
        Tooltip top
      </span>
    </Tooltip>
    <Tooltip position='bottom' render={() => <span>Default</span>}>
      <span style={{ ...tooltipStyle, marginLeft: '100px' }}>
        Tooltip bottom
      </span>
    </Tooltip>
  </div>
))

addStory('with stateless component', readme, () => (
  <Tooltip position='right' render={() => <div>Hello world</div>}>
    <Icon name='person' style={iconStyle} />
  </Tooltip>
))

addStory('without arrow', readme, () => (
  <Tooltip
    arrow={false}
    position='right'
    render={() => <div><h3>Without arrow</h3></div>}
  >
    <span style={tooltipStyle}>
      Tooltip without arrow
    </span>
  </Tooltip>
))

addStory('fade', readme, () => (
  <div>
    <h2>Default fade time</h2>
    <Tooltip position='right' fade render={() => <span>Fade</span>}>
      <span style={tooltipStyle}>
        Tooltip right
      </span>
    </Tooltip>

    <h2>Custom fade time</h2>
    <Tooltip position='right' fade fadeTime={3000} render={() => <span>Fade 3s</span>}>
      <span style={tooltipStyle}>
        Tooltip right
      </span>
    </Tooltip>
  </div>
))

addStory('Popover', readme, () => (
  <Tooltip
    position='right'
    triggerOn='click'
    render={() => <div><h3>Popover</h3></div>}
  >
    <span style={tooltipStyle}>
      Popover
    </span>
  </Tooltip>
))

addStory('Popover without arrow', readme, () => (
  <Tooltip
    position='right'
    triggerOn='click'
    arrow={false}
    render={() => <div><h3>Popover</h3></div>}
  >
    <span style={tooltipStyle}>
      Popover without arrow
    </span>
  </Tooltip>
))

addStory('Popover fade', readme, () => (
  <div>
    <h2>Default Popover fade time</h2>
    <Tooltip
      triggerOn='click'
      position='right'
      fade
      render={() => <div><h3>Popover fade</h3></div>}
    >
      <span style={tooltipStyle}>
        Popover
      </span>
    </Tooltip>

    <h2>Custom Popover fade time</h2>
    <Tooltip
      triggerOn='click'
      position='right'
      fade
      fadeTime={3000}
      render={() => <div><h3>Popover fade 3s</h3></div>}
    >
      <span style={tooltipStyle}>
        Popover
      </span>
    </Tooltip>
  </div>
))

addStory('Popover with tooltip', readme, () => (
  <Tooltip position='right' triggerOn='click' arrow={false} render={() => (
    <Tooltip render={() => <div>Tooltip</div>}>
      <span style={{ ...tooltipStyle, backgroundColor: 'transparent' }}>
        Popover with Tooltip
      </span>
    </Tooltip>
  )}>
    <span style={tooltipStyle}>
      Popover
    </span>
  </Tooltip>
))

addStory('auto-changed position', readme, () => (
  <div>
    <Tooltip position='left' render={() => <div>Tooltip</div>}>
      <span style={tooltipStyle}>
        Tooltip left (but without enough place)
      </span>
    </Tooltip>

    <div style={{ float: 'right' }}>
      <Tooltip position='right' render={() => <div>Tooltip</div>}>
        <span style={tooltipStyle}>
          Tooltip right (but without enough place)
        </span>
      </Tooltip>
    </div>
  </div>
))

addStory.controlled('locked position', readme, (setState, state) => (
  <div>
    Left: <input
      type='number'
      value={state.left}
      onChange={e => setState({ left: parseInt(e.target.value, 10) })}
    />

    <br />

    <div style={{ position: 'relative', left: state.left + 'px' }}>
      <Tooltip position='left' open render={() => <div>Tooltip</div>}>
        <span style={tooltipStyle}>
          Left: Unlocked
        </span>
      </Tooltip>

      <br />

      <Tooltip position='left' open lockPosition render={() => <div>Tooltip</div>}>
        <span style={tooltipStyle}>
          Left: Locked
        </span>
      </Tooltip>
    </div>

    <Tooltip position='left' open render={() => <div>Tooltip</div>}>
      <div style={{ ...tooltipStyle, display: 'block', margin: '0 30px' }}>
        Left: Unlocked
      </div>
    </Tooltip>

    <br />

    <Tooltip position='left' open lockPosition render={() => <div>Tooltip</div>}>
      <div style={{ ...tooltipStyle, display: 'block', margin: '0 30px' }}>
        Left: Locked
      </div>
    </Tooltip>
  </div>
), () => ({ left: 75 }))

function render (setState, state) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip
        open={state.open}
        position='right'
        render={() => <span>I am controlled</span>}
      >
        <span style={{ ...tooltipStyle, cursor: 'default' }}>
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

addStory.controlled('controlled', readme, render, getInitialState)

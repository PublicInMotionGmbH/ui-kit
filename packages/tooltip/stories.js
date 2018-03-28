import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/commons/story'

import Tooltip from './src/Tooltip'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Tooltip', module)

const tooltipStyle = {
  display: 'inline-block',
  backgroundColor: '#eee',
  padding: '1rem',
  margin: '25px 100px',
  cursor: 'pointer'
}

function render (setState, state) {
  return (
    <div>
      <span
        onClick={() => setState({ isOpen: !state.isOpen })}
        style={{
          display: 'inline-block',
          backgroundColor: '#e00',
          color: '#fff',
          padding: '1rem',
          marginBottom: '2rem',
          cursor: 'pointer'
        }}
      >
        Press me
      </span>
      <Tooltip
        color='primary'
        isOpen={state.isOpen}
        position='right'
        render={() => <span>I am controlled</span>}
      >
        <span
          style={{
            display: 'inline-block',
            backgroundColor: '#eee',
            padding: '1rem'
          }}
        >
          Tooltip right
        </span>
      </Tooltip>
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
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <Tooltip color='primary' position='top' render={() => <span>Default</span>}>
      <span
        style={tooltipStyle}
      >
        Tooltip top
      </span>
    </Tooltip>
    <Tooltip color='primary' position='bottom' render={() => <span>Default</span>}>
      <span
        style={{
          display: 'inline-block',
          backgroundColor: '#eee',
          padding: '1rem',
          margin: '25px 100px',
          cursor: 'pointer'
        }}
      >
        Tooltip bottom
      </span>
    </Tooltip>
    <Tooltip color='primary' position='right' render={() => <span>Default</span>}>
      <span
        style={tooltipStyle}
      >
        Tooltip right
      </span>
    </Tooltip>
    <Tooltip color='primary' position='left' render={() => <span>Default</span>}>
      <span
        style={tooltipStyle}
      >
        Tooltip left
      </span>
    </Tooltip>
  </div>
))
addStory('fade', readme, () => (
  <Tooltip color='primary' fade position='right' render={() => <span>Fade</span>}>
    <span
      style={tooltipStyle}
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
addStory.controlled('controlled', readme, render, getInitialState)

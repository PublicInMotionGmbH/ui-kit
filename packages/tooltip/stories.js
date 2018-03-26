import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/commons/story'

import Tooltip from './src/Tooltip'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Tooltip', module)

// Helper component

class ControlledTooltip extends React.Component {
  constructor (props) {
    super()
    this.state = {
      isOpen: false
    }
    this.keyPressListener = this.keyPressListener.bind(this)
    this.toggleTooltip = this.toggleTooltip.bind(this)
  }

  componentDidMount () {
    window.addEventListener('keydown', this.keyPressListener)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.keyPressListener)
  }

  keyPressListener (e) { return (e.keyCode === 72 ? this.toggleTooltip() : null) }

  toggleTooltip () {
    this.setState(state => ({ isOpen: !state.isOpen }))
  }

  render () {
    return (
      <Tooltip
        color='primary'
        isOpen={this.state.isOpen}
        position='right'
        render={() => <span>I am controlled</span>}
      >
        <span
          style={{
            display: 'inline-block',
            backgroundColor: '#eee',
            padding: '1rem',
            cursor: 'pointer'
          }}
        >
          Press 'h' key
        </span>
      </Tooltip>
    )
  }
}

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
addStory('controlled', readme, () => <ControlledTooltip />)

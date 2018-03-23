import React from 'react'

import Popover from './src/Popover'
import Button from '../../packages/button/src/Button'
import { storiesOf } from '@storybook/react'

import {
  createStoriesFactory,
  getReadmeDescription
} from '@talixo/commons/story'

const addStory = createStoriesFactory('Popover', module)

const Menu = () => (
  <div>
    <h3>Menu</h3>
    <hr style={{ border: '1px solid #fff' }} />
    <ul style={{ listStyle: 'none', padding: '0' }}>
      <li style={{ cursor: 'pointer' }}>Home</li>
      <li style={{ cursor: 'pointer' }}>Issues</li>
      <li style={{ cursor: 'pointer' }}>Help</li>
    </ul>
  </div>
)

function render (setState, state) {
  const togglePopover = id => setState({ activeTarget: state.activeTarget === id ? null : id })

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        minHeight: '500px',
        maxHeight: '100%'
      }}
    >
      <div>
        <Button id='popover-bottom' onClick={() => togglePopover('popover-bottom')} color='primary'>
          Popover default right
        </Button>
        <Popover
          target='#popover-bottom'
          isOpen={state.activeTarget === 'popover-bottom'}
          color='primary'
          position='right'
          layer={2}
        >
          <span>Bottom</span>
        </Popover>
      </div>
      <div>
        <Button id='popover-right' onClick={() => togglePopover('popover-right')} color='primary'>
          Popover fade right
        </Button>
        <Popover
          target='#popover-right'
          isOpen={state.activeTarget === 'popover-right'}
          color='primary'
          position='right'
          fade='true'
          fadeTime={2000}
          layer={2}
        >
          <span>Top</span>
        </Popover>
      </div>
      <div>
        <Button id='popover-menu-right' onClick={() => togglePopover('popover-menu-right')} color='primary'>
          Popover menu right
        </Button>
        <Popover
          target='#popover-menu-right'
          isOpen={state.activeTarget === 'popover-menu-right'}
          color='primary'
          position='right'
          fade='true'
          layer={2}
        >
          <Menu />
        </Popover>
      </div>
      <div>
        <Button id='popover-menu-bottom' onClick={() => togglePopover('popover-menu-bottom')} color='primary'>
          Popover menu bottom
        </Button>
        <Popover
          target='#popover-menu-bottom'
          isOpen={state.activeTarget === 'popover-menu-bottom'}
          color='primary'
          position='bottom'
          fade='true'
          layer={2}
        >
          <Menu />
        </Popover>
      </div>
    </div>
  )
}

function getInitialState () {
  return {
    activeTarget: null
  }
}

addStory.controlled('all popovers', '', render, getInitialState)

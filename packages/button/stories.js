import React from 'react'
import { action } from '@storybook/addon-actions'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { Icon } from '@talixo/icon'

import Button from './src/Button'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Button', module, {
  propTables: [ Button ]
})
const click = action('button-click')

addStory('default size', readme, () => (
  <div>
    <h2>Default button</h2>
    <Button onClick={click}>Default</Button>{' '}
    <Button onClick={click} ghost>Ghost</Button>{' '}
    <Button onClick={click} disabled>Disabled</Button>{' '}
    <Button onClick={click} ghost disabled>Ghost & disabled</Button>

    <h2>Primary</h2>
    <Button onClick={click} type='primary'>Default</Button>{' '}
    <Button onClick={click} type='primary' ghost>Ghost</Button>{' '}
    <Button onClick={click} type='primary' disabled>Disabled</Button>{' '}
    <Button onClick={click} type='primary' ghost disabled>Ghost & disabled</Button>

    <h2>Secondary</h2>
    <Button onClick={click} type='secondary'>Default</Button>{' '}
    <Button onClick={click} type='secondary' ghost>Ghost</Button>{' '}
    <Button onClick={click} type='secondary' disabled>Disabled</Button>{' '}
    <Button onClick={click} type='secondary' ghost disabled>Ghost & disabled</Button>

    <h2>Tertiary</h2>
    <Button onClick={click} type='tertiary'>Default</Button>{' '}
    <Button onClick={click} type='tertiary' ghost>Ghost</Button>{' '}
    <Button onClick={click} type='tertiary' disabled>Disabled</Button>{' '}
    <Button onClick={click} type='tertiary' ghost disabled>Ghost & disabled</Button>

    <h2>Error</h2>
    <Button onClick={click} type='error'>Default</Button>{' '}
    <Button onClick={click} type='error' ghost>Ghost</Button>{' '}
    <Button onClick={click} type='error' disabled>Disabled</Button>{' '}
    <Button onClick={click} type='error' ghost disabled>Ghost & disabled</Button>

    <h2>Warning</h2>
    <Button onClick={click} type='warning'>Default</Button>{' '}
    <Button onClick={click} type='warning' ghost>Ghost</Button>{' '}
    <Button onClick={click} type='warning' disabled>Disabled</Button>{' '}
    <Button onClick={click} type='warning' ghost disabled>Ghost & disabled</Button>

    <h2>Info</h2>
    <Button onClick={click} type='info'>Default</Button>{' '}
    <Button onClick={click} type='info' ghost>Ghost</Button>{' '}
    <Button onClick={click} type='info' disabled>Disabled</Button>{' '}
    <Button onClick={click} type='info' ghost disabled>Ghost & disabled</Button>

    <h2>Success</h2>
    <Button onClick={click} type='success'>Default</Button>{' '}
    <Button onClick={click} type='success' ghost>Ghost</Button>{' '}
    <Button onClick={click} type='success' disabled>Disabled</Button>{' '}
    <Button onClick={click} type='success' ghost disabled>Ghost & disabled</Button>

    <h2>Link</h2>
    <Button onClick={click} type='link'>Default</Button>{' '}
    <Button onClick={click} type='link' disabled>Disabled</Button>
  </div>
))

addStory('small', readme, () => (
  <div>
    <h2>Default button</h2>
    <Button small onClick={click}>Default</Button>{' '}
    <Button small onClick={click} ghost>Ghost</Button>{' '}
    <Button small onClick={click} disabled>Disabled</Button>{' '}
    <Button small onClick={click} ghost disabled>Ghost & disabled</Button>

    <h2>Primary</h2>
    <Button small onClick={click} type='primary'>Default</Button>{' '}
    <Button small onClick={click} type='primary' ghost>Ghost</Button>{' '}
    <Button small onClick={click} type='primary' disabled>Disabled</Button>{' '}
    <Button small onClick={click} type='primary' ghost disabled>Ghost & disabled</Button>

    <h2>Secondary</h2>
    <Button small onClick={click} type='secondary'>Default</Button>{' '}
    <Button small onClick={click} type='secondary' ghost>Ghost</Button>{' '}
    <Button small onClick={click} type='secondary' disabled>Disabled</Button>{' '}
    <Button small onClick={click} type='secondary' ghost disabled>Ghost & disabled</Button>

    <h2>Tertiary</h2>
    <Button small onClick={click} type='tertiary'>Default</Button>{' '}
    <Button small onClick={click} type='tertiary' ghost>Ghost</Button>{' '}
    <Button small onClick={click} type='tertiary' disabled>Disabled</Button>{' '}
    <Button small onClick={click} type='tertiary' ghost disabled>Ghost & disabled</Button>

    <h2>Error</h2>
    <Button small onClick={click} type='error'>Default</Button>{' '}
    <Button small onClick={click} type='error' ghost>Ghost</Button>{' '}
    <Button small onClick={click} type='error' disabled>Disabled</Button>{' '}
    <Button small onClick={click} type='error' ghost disabled>Ghost & disabled</Button>

    <h2>Warning</h2>
    <Button small onClick={click} type='warning'>Default</Button>{' '}
    <Button small onClick={click} type='warning' ghost>Ghost</Button>{' '}
    <Button small onClick={click} type='warning' disabled>Disabled</Button>{' '}
    <Button small onClick={click} type='warning' ghost disabled>Ghost & disabled</Button>

    <h2>Info</h2>
    <Button small onClick={click} type='info'>Default</Button>{' '}
    <Button small onClick={click} type='info' ghost>Ghost</Button>{' '}
    <Button small onClick={click} type='info' disabled>Disabled</Button>{' '}
    <Button small onClick={click} type='info' ghost disabled>Ghost & disabled</Button>

    <h2>Success</h2>
    <Button small onClick={click} type='success'>Default</Button>{' '}
    <Button small onClick={click} type='success' ghost>Ghost</Button>{' '}
    <Button small onClick={click} type='success' disabled>Disabled</Button>{' '}
    <Button small onClick={click} type='success' ghost disabled>Ghost & disabled</Button>

    <h2>Link</h2>
    <Button small onClick={click} type='link'>Default</Button>{' '}
    <Button small onClick={click} type='link' disabled>Disabled</Button>
  </div>
))

addStory('full width', readme, () => (
  <div>
    <Button onClick={click} wide>Default Full Width</Button>
    <Button onClick={click} type='primary' wide>Primary Full Width</Button>
    <Button onClick={click} type='error' wide>Error Full Width</Button>
    <Button onClick={click} type='primary' wide disabled>Disabled Full Width</Button>
  </div>
))

addStory('small & full width', readme, () => (
  <div>
    <Button onClick={click} small wide>Default Full Width</Button>
    <Button onClick={click} type='primary' small wide>Primary Full Width</Button>
    <Button onClick={click} type='error' small wide>Error Full Width</Button>
    <Button onClick={click} type='primary' small wide disabled>Disabled Full Width</Button>
  </div>
))

addStory('with icon', readme, () => (
  <div>
    <h2>Default size button with icon</h2>
    <Button onClick={click}><Icon name='home' /> Home</Button>{' '}
    <Button onClick={click} type='primary'><Icon name='settings' /> <span>Settings</span></Button>{' '}
    <Button onClick={click} type='error'><Icon name='cancel' /> Cancel</Button>{' '}
    <Button onClick={click} disabled><Icon name='do_not_disturb' /> Disabled</Button>

    <h2>Small button with icon</h2>
    <Button onClick={click} small><Icon name='home' /> Home</Button>{' '}
    <Button onClick={click} type='primary' small><Icon name='settings' /> Settings</Button>{' '}
    <Button onClick={click} type='warning' small><Icon name='cancel' /> Cancel</Button>{' '}
    <Button onClick={click} small disabled><Icon name='do_not_disturb' /> Disabled</Button>

    <h2>Full width size button with icon</h2>
    <Button onClick={click} wide><Icon name='home' /> <span>Home</span></Button>{' '}
    <Button onClick={click} type='primary' wide><Icon name='settings' /> Settings</Button>{' '}
    <Button onClick={click} type='success' wide><Icon name='cancel' /> Cancel</Button>{' '}
    <Button onClick={click} wide disabled><Icon name='do_not_disturb' /> Disabled</Button>
  </div>
))

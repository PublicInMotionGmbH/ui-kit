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
    <h2>Button default</h2>
    <Button onClick={click}>
      Default
    </Button>
    <Button onClick={click} disabled>
      Default Disabled
    </Button>
    <h2>Button primary</h2>
    <Button onClick={click} color='primary'>
      Primary
    </Button>
    <Button onClick={click} color='primary' variant='ghost'>
      Primary Ghost
    </Button>
    <Button onClick={click} color='primary' disabled>
      Primary Disabled
    </Button>
    <h2>Button black</h2>
    <Button onClick={click} color='black'>
      Black
    </Button>
    <Button onClick={click} color='black' variant='ghost'>
      Black Ghost
    </Button>
    <Button onClick={click} color='black' disabled>
      Black Disabled
    </Button>
  </div>
))

addStory('small', readme, () => (
  <div>
    <h2>Button default</h2>
    <Button onClick={click} size='small'>
      Default
    </Button>
    <Button onClick={click} size='small' disabled>
      Default Disabled
    </Button>
    <h2>Button primary</h2>
    <Button onClick={click} color='primary' size='small'>
      Primary
    </Button>
    <Button onClick={click} color='primary' variant='ghost' size='small'>
      Primary Ghost
    </Button>
    <Button onClick={click} color='primary' size='small' disabled>
      Primary Disabled
    </Button>
    <h2>Button black</h2>
    <Button onClick={click} color='black' size='small'>
      Black
    </Button>
    <Button onClick={click} color='black' variant='ghost' size='small'>
      Black Ghost
    </Button>
    <Button onClick={click} color='black' size='small' disabled>
      Black Disabled
    </Button>
  </div>
))

addStory('full width', readme, () => (
  <div>
    <Button onClick={click} variant='full-width'>
      Default Full Width
    </Button>
    <Button onClick={click} color='primary' variant='full-width'>
      Primary Full Width
    </Button>
    <Button onClick={click} color='black' variant='full-width'>
      Black Full Width
    </Button>
    <Button onClick={click} color='primary' variant='full-width' disabled>
      Disabled Full Width
    </Button>
  </div>
))

addStory('with icon', readme, () => (
  <div>
    <h2>Default size button with icon</h2>
    <Button onClick={click}>
      <Icon name='home' /> Home
    </Button>
    <Button onClick={click} color='primary'>
      <Icon name='settings' /> Settings
    </Button>
    <Button onClick={click} color='black'>
      <Icon name='cancel' /> Cancel
    </Button>
    <Button onClick={click} disabled>
      <Icon name='do_not_disturb' /> Disabled
    </Button>

    <h2>Small button with icon</h2>
    <Button onClick={click} size='small'>
      <Icon name='home' /> Home
    </Button>
    <Button onClick={click} color='primary' size='small'>
      <Icon name='settings' /> Settings
    </Button>
    <Button onClick={click} color='black' size='small'>
      <Icon name='cancel' /> Cancel
    </Button>
    <Button onClick={click} size='small' disabled>
      <Icon name='do_not_disturb' /> Disabled
    </Button>

    <h2>Full width size butoon with icon</h2>
    <Button onClick={click} variant='full-width'>
      <Icon name='home' /> Home
    </Button>
    <Button onClick={click} color='primary' variant='full-width'>
      <Icon name='settings' /> Settings
    </Button>
    <Button onClick={click} color='black' variant='full-width'>
      <Icon name='cancel' /> Cancel
    </Button>
    <Button onClick={click} variant='full-width' disabled>
      <Icon name='do_not_disturb' /> Disabled
    </Button>
  </div>
))

import React from 'react'

import Icon from '@talixo/icon'
import Button from './src/Button'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { action } from '@storybook/addon-actions'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Button', module)
const click = action('button-click')

addStory('button-default-size', readme, () => (
  <div>
    <h2>Button default</h2>
    <Button onClick={click}>
      Default
    </Button>
    <Button disabled>
      Default Disabled
    </Button>
    <h2>Button primary</h2>
    <Button color='primary' onClick={click}>
      Primary
    </Button>
    <Button color='primary' variant='ghost'>
      Primary Ghost
    </Button>
    <Button color='primary' disabled>
      Primary Disabled
    </Button>
    <h2>Button black</h2>
    <Button color='black'>
      Black
    </Button>
    <Button color='black' variant='ghost'>
      Black Ghost
    </Button>
    <Button color='black' disabled>
      Black Disabled
    </Button>
  </div>
))

addStory('button-small', readme, () => (
  <div>
    <h2>Button default</h2>
    <Button onClick={click} size='small'>
      Default
    </Button>
    <Button size='small' disabled>
      Default Disabled
    </Button>
    <h2>Button primary</h2>
    <Button color='primary' onClick={click} size='small'>
      Primary
    </Button>
    <Button color='primary' variant='ghost' size='small'>
      Primary Ghost
    </Button>
    <Button color='primary' size='small' disabled>
      Primary Disabled
    </Button>
    <h2>Button black</h2>
    <Button color='black' size='small'>
      Black
    </Button>
    <Button color='black' variant='ghost' size='small'>
      Black Ghost
    </Button>
    <Button color='black' size='small' disabled>
      Black Disabled
    </Button>
  </div>
))

addStory('button-full-width', readme, () => (
  <div>
    <Button variant='full-width'>
      Default Full Width
    </Button>
    <Button color='primary' variant='full-width'>
      Primary Full Width
    </Button>
    <Button color='black' variant='full-width'>
      Black Full Width
    </Button>
    <Button color='primary' variant='full-width' disabled>
      Disabled Full Width
    </Button>
  </div>
))

addStory('with icon', readme, () => (
  <div>
    <h2>Default size button with icon</h2>
    <Button>
      <Icon name='home' /> Home
    </Button>
    <Button color='primary'>
      <Icon name='settings' /> Settings
    </Button>
    <Button color='black'>
      <Icon name='cancel' /> Cancel
    </Button>
    <Button disabled>
      <Icon name='location_disabled' /> Disabled
    </Button>

    <h2>Small button with icon</h2>
    <Button size='small'>
      <Icon name='home' /> Home
    </Button>
    <Button color='primary' size='small'>
      <Icon name='settings' /> Settings
    </Button>
    <Button color='black' size='small'>
      <Icon name='cancel' /> Cancel
    </Button>
    <Button size='small' disabled>
      <Icon name='location_disabled' /> Disabled
    </Button>

    <h2>Full width size butoon with icon</h2>
    <Button variant='full-width'>
      <Icon name='home' /> Home
    </Button>
    <Button color='primary' variant='full-width'>
      <Icon name='settings' /> Settings
    </Button>
    <Button color='black' variant='full-width'>
      <Icon name='cancel' /> Cancel
    </Button>
    <Button variant='full-width' disabled>
      <Icon name='location_disabled' /> Disabled
    </Button>
  </div>
))

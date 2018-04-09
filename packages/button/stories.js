import React from 'react'

import { Icon } from '@talixo/icon'

import Button from './src/Button'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Button', module)

addStory('primary-default', readme, () => (
  <Button color='primary'>
    Default
  </Button>
))

addStory('primary-small', readme, () => (
  <Button color='primary' size='small'>
    Small
  </Button>
))

addStory('primary-full-width', readme, () => (
  <Button color='primary' variant='full-width'>
    Full width
  </Button>
))

addStory('primary-ghost', readme, () => (
  <Button color='primary' variant='ghost'>
    Ghost
  </Button>
))

addStory('primary-disabled', readme, () => (
  <Button color='primary' disabled>
    Disabled
  </Button>
))
addStory('primary-disabled-full-width', readme, () => (
  <Button color='primary' variant='full-width' disabled>
    Disabled full-width
  </Button>
))

addStory('black-default', readme, () => (
  <Button color='black'>
    Black
  </Button>
))

addStory('black-small', readme, () => (
  <Button color='black' size='small'>
    Black
  </Button>
))

addStory('black-full-width', readme, () => (
  <Button color='black' variant='full-width'>
    Full width
  </Button>
))

addStory('black-ghost', readme, () => (
  <Button color='black' variant='ghost'>
    Black
  </Button>
))

addStory('black-disabled', readme, () => (
  <Button color='black' disabled>
    Disabled
  </Button>
))

addStory('black-disabled-full-width', readme, () => (
  <Button color='black' variant='full-width' disabled>
    Disabled Full Width
  </Button>
))

addStory('with icon', readme, () => (
  <Button color='primary'>
    <Icon name='settings' /> Settings
  </Button>
))

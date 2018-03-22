import React from 'react'

import Button from './src/Button'

import {
  createStoriesFactory,
  getReadmeDescription
} from '@talixo/commons/story'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Button', module)

addStory('primary-default', readme, () => (
  <Button color='primary'>
    <span>Default</span>
  </Button>
))
addStory('primary-small', readme, () => (
  <Button color='primary' size='small'>
    <span>Small</span>
  </Button>
))
addStory('primary-full-width', readme, () => (
  <Button color='primary' variant='full-width'>
    <span>Full width</span>
  </Button>
))
addStory('primary-ghost', readme, () => (
  <Button color='primary' variant='ghost'>
    <span>Ghost</span>
  </Button>
))
addStory('primary-disabled', readme, () => (
  <Button color='primary' disabled>
    <span>Disabled</span>
  </Button>
))
addStory('primary-disabled-full-width', readme, () => (
  <Button color='primary' variant='full-width' disabled>
    <span>Disabled Full Width</span>
  </Button>
))

addStory('black-default', readme, () => (
  <Button color='black'>
    <span>Black</span>
  </Button>
))
addStory('black-small', readme, () => (
  <Button color='black' size='small'>
    <span>Black</span>
  </Button>
))
addStory('black-full-width', readme, () => (
  <Button color='black' variant='full-width'>
    <span>Full width</span>
  </Button>
))
addStory('black-ghost', readme, () => (
  <Button color='black' variant='ghost'>
    <span>Black</span>
  </Button>
))
addStory('black-disabled', readme, () => (
  <Button color='black' disabled>
    <span>Disabled</span>
  </Button>
))
addStory('black-disabled-full-width', readme, () => (
  <Button color='black' variant='full-width' disabled>
    <span>Disabled Full Width</span>
  </Button>
))

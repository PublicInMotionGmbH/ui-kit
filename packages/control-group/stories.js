import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { Button } from '@talixo/button'

import ControlGroup from './src/ControlGroup'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('ControlGroup', module)

// Stories

addStory('initial', readme, () => (
  <ControlGroup>
    <Button>Left</Button>
    <Button>Middle</Button>
    <Button>Right</Button>
  </ControlGroup>
))

addStory('horizontal center', readme, () => (
  <ControlGroup position='center'>
    <Button>Left</Button>
    <Button>Middle</Button>
    <Button>Right</Button>
  </ControlGroup>
))

addStory('horizontal right', readme, () => (
  <ControlGroup position='right'>
    <Button>Left</Button>
    <Button>Middle</Button>
    <Button>Right</Button>
  </ControlGroup>
))

addStory('vertical left', readme, () => (
  <ControlGroup orientation='vertical'>
    <Button>Left</Button>
    <Button>Middle</Button>
    <Button>Right</Button>
  </ControlGroup>
))

addStory('vertical center', readme, () => (
  <ControlGroup orientation='vertical' position='center'>
    <Button>Left</Button>
    <Button>Middle</Button>
    <Button>Right</Button>
  </ControlGroup>
))

addStory('vertical right', readme, () => (
  <ControlGroup orientation='vertical' position='right'>
    <Button>Left</Button>
    <Button>Middle</Button>
    <Button>Right</Button>
  </ControlGroup>
))

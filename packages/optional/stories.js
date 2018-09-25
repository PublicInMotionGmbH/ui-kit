import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Optional from './src/Optional'
import { NumberInput } from '@talixo/number-input'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Optional', module, {
  propTables: [ Optional ]
})

// Stories

addStory('initial', readme, () => (
  <Optional name='request' label='I have a special request' />
))

addStory('collapsible', readme, () => (
  <Optional
    name='request'
    collapsible
    label='I have a special request'
  />
))

addStory('collapsible and initially open', readme, () => (
  <Optional
    name='request'
    label='I have a special request'
    collapsible
    open
  />
))

addStory('with placeholder', readme, () => (
  <Optional
    name='request'
    label='I have a special request'
    placeholder='Write your request here...'
  />
))

addStory('disabled', readme, () => (
  <Optional
    name='request'
    label='I have a special request'
    placeholder='Write your request here...'
    disabled
  />
))

addStory('disabled collapsible', readme, () => (
  <Optional
    name='request'
    label='I have a special request'
    placeholder='Write your request here...'
    collapsible
    open
    disabled
  />
))

addStory('read only', readme, () => (
  <Optional
    name='request'
    label='I have a special request'
    placeholder='Write your request here...'
    value='Can`t change this text'
    readOnly
  />
))

addStory('with initial value', readme, () => (
  <Optional
    name='request'
    label='I have a special request'
    value='Please be on time'
  />
))

addStory('with custom element', readme, () => (
  <Optional
    name='request'
    label='I have a special request'
    optionalElement={<NumberInput />}
  />
))

addStory.controlled('handle on change', readme, (setState, state) => (
  <Optional
    name='request'
    label='I have a special request'
    value={state.active}
    onChange={(value) => setState({ value })}
  />
), () => ({ value: null }))
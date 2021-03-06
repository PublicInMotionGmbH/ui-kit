import React from 'react'
import { action } from '@storybook/addon-actions'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { Icon } from '@talixo/icon'

import InlineInput from './src/InlineInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Inline Input', module, {
  propTables: [ InlineInput ]
})

// Create actions
const change = action('change')

// Stories

addStory('default', readme, () => (
  <InlineInput placeholder='Edit me' />
))

addStory('with value', readme, () => (
  <InlineInput placeholder='Edit me' value='John Smith' />
))

addStory('with emptyValue', readme, () => (
  <InlineInput placeholder='Edit me' emptyValue='n/a' />
))

addStory('with value and emptyValue', readme, () => (
  <InlineInput
    placeholder='Edit me'
    emptyValue='n/a'
    value='John Smith'
  />
))

addStory('error', readme, () => (
  <InlineInput
    placeholder='Edit me'
    value='John Smith'
    error
  />
))

addStory('with icon', readme, () => (
  <InlineInput
    placeholder='Edit me'
    icon={<Icon name='error' />}
  />
))

addStory('disabled', readme, () => (
  <InlineInput placeholder='I am disabled' disabled />
))

addStory('input change', readme, () => (
  <div>
    <InlineInput
      placeholder='Edit me'
      onChange={change}
    />
  </div>
))

addStory('input with label', readme, () => (
  <div>
    <label htmlFor='inline-input'>Click me</label>

    <InlineInput
      id='inline-input'
      placeholder='Edit me'
      onChange={change}
    />
  </div>
))

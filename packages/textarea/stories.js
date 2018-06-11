import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import TextareaAutosize from 'react-textarea-autosize'

import Textarea from './src/Textarea'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Textarea', module, {
  propTables: [ Textarea ]
})

// Stories

addStory('initial', readme, () => (
  <Textarea />
))

addStory('placeholder', readme, () => (
  <Textarea placeholder='Write message here' />
))

addStory('resize inactive', readme, () => (
  <Textarea resize={false} />
))

addStory('with max length', readme, () => (
  <Textarea maxLength={5} />
))

addStory('disabled', readme, () => (
  <Textarea disabled placeholder="Sorry, but you can't write here..." />
))

addStory('auto grow', readme, () => (
  <Textarea TextareaComponent={TextareaAutosize} />
))

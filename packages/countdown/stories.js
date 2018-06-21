import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Countdown from './src/Countdown'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Countdown', module, {
  propTables: [ Countdown ]
})

// mock deadline in the future according to actual date
const setDeadline = (addTime) => {
  const dateNow = Date.now()
  const deadline = dateNow + addTime
  const deadlineConverted = new Date(deadline).toISOString()

  return deadlineConverted
}

// Stories

addStory('initial', readme, () => (
  <Countdown targetDate={setDeadline(190000000)} />
))

addStory('with custom format', readme, () => (
  <Countdown targetDate={setDeadline(190000000)} format='dd days hh hours mm minutes ss seconds' />
))

addStory('with optional format', readme, () => (
  <Countdown targetDate={setDeadline(80008000)} format='[dd days] hh hours mm minutes ss seconds' />
))

addStory('with two optional format', readme, () => (
  <Countdown targetDate={setDeadline(90008000)} format='[dd days hh hours] mm minutes ss seconds' />
))

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

// Custom format
const arr = ['days', 'hours', 'minutes', 'seconds']

function customFormat (props) {
  arr.map(type => props[type]).join(':')
}

function getInitialState () {
  return {
    days: 0,
    hours: 0,
    min: 0,
    sec: 0
  }
}

// Stories

addStory('initial', readme, () => (
  <Countdown targetDate={setDeadline(190000000)} />
))

addStory.controlled('with custom format', readme, (setState, state) => {
  return (
    <Countdown
      targetDate={setDeadline(190000000)}
      render={customFormat(state)}
    />
  )
}, getInitialState)

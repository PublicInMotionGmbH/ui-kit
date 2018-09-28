import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { Icon } from '@talixo/icon'

import Timeline from './src/Timeline'
import TimelineElement from './src/TimelineElement'
import TimelineLine from './src/TimelineLine'
import TimelinePoint from './src/TimelinePoint'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Timeline', module, {
  propTables: [ Timeline ]
})

// Example of time
const startTime = '12:10'
const middleTime = '14:10'
const endTime = '16:38'
const rideTime = '1:45'

// Stories

addStory('simple', readme, () => (
  <Timeline>
    <TimelinePoint>
      <TimelineElement time={startTime}>
        <Icon name='directions_car' />
      </TimelineElement>
    </TimelinePoint>

    <TimelineLine />

    <TimelinePoint>
      <TimelineElement time={middleTime}>
        Restaurant
      </TimelineElement>
    </TimelinePoint>

    <TimelineLine />

    <TimelinePoint>
      <Icon name='local_airport' />
    </TimelinePoint>

    <TimelineLine />

    <TimelinePoint>
      <TimelineElement time={endTime}>
        <Icon name='check' />
      </TimelineElement>
    </TimelinePoint>
  </Timeline>
))

addStory('two-point ride', readme, () => (
  <Timeline>
    <TimelinePoint>
      <TimelineElement time={startTime}>
        <Icon name='local_airport' />
        <Icon name='card_travel' />
      </TimelineElement>
    </TimelinePoint>

    <TimelineLine special />

    <TimelinePoint special>
      <Icon name='directions_car' />
    </TimelinePoint>

    <TimelineLine special />
    <TimelinePoint>
      <TimelineElement time={endTime}>
        <Icon name='check' />
      </TimelineElement>
    </TimelinePoint>
  </Timeline>
))

addStory('with ride time', readme, () => (
  <Timeline>
    <TimelinePoint>
      <TimelineElement time={startTime}>
        <Icon name='local_airport' />
      </TimelineElement>
    </TimelinePoint>

    <TimelineLine short />

    <TimelinePoint>
      <TimelineElement time={rideTime}>
        <Icon name='card_travel' />
      </TimelineElement>
    </TimelinePoint>

    <TimelineLine special />

    <TimelinePoint special>
      <Icon name='directions_car' />
    </TimelinePoint>

    <TimelineLine special />
    <TimelinePoint>
      <TimelineElement time={endTime}>
        <Icon name='check' />
      </TimelineElement>
    </TimelinePoint>
  </Timeline>
))

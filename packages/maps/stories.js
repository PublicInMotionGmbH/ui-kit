import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Maps from './src/Maps'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Maps', module)

// Stories

addStory('start & end locations', readme, () => (
  <Maps startLocation={{lat: 52.370278, lng: 13.521388}}
    endLocation={{lat: 52.937239, lng: 13.52123}}
  />
))

addStory('center on location', readme, () => (
  <Maps initialCenter={{lat: 50.0647, lng: 19.9450}}
  />
))

addStory('location with zoom', readme, () => (
  <Maps initialCenter={{lat: 50.0647, lng: 19.9450}} zoom={18}
  />
))

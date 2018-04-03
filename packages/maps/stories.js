import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Maps from './src/Maps'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Maps', module)

// Stories

addStory('initial map', readme, () => (
  <Maps startLocation={{latLng: {location: {lat: 52.370278, lng: 13.521388}}, talixo_id: '751267062c92e398c3942214b58136f73a4b9e1ca9a214d72d6d5805'}} />
))

import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Map from './src/Map'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Map', module)

const apiKey = 'AIzaSyDwOkFSSCfh-3zjsjc4_JS5z-ETVZT3yCc'

// Stories
addStory('default', readme, () => (
  <Map apiKey={apiKey} />
))

addStory('marker point with zoom', readme, () => (
  <Map apiKey={apiKey} zoom={14} markerPosition={{lat: -27.5598, lng: 151.9507}} />
))

addStory('marker point with info window', readme, () => (
  <Map apiKey={apiKey} markerPosition={{lat: -33.8688, lng: 151.2093}} infoText='This is INFO WINDOW' />
))

addStory('map is not interactive', readme, () => (
  <Map apiKey={apiKey} zoom={14} markerPosition={{lat: -27.5598, lng: 151.9507}} interactive={false} />
))

addStory('start and end points', readme, () => (
  <Map apiKey={apiKey} startPoint={{lat: -30.397, lng: 150.644}} endPoint={{lat: -32.397, lng: 150.644}} />
))

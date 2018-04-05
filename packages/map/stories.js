import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Map from './src/Map'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Map', module)

// Stories
addStory('default with no props', readme, () => (
  <Map apiKey='AIzaSyDwOkFSSCfh-3zjsjc4_JS5z-ETVZT3yCc' />
))

addStory('marker point', readme, () => (
  <Map apiKey='AIzaSyDwOkFSSCfh-3zjsjc4_JS5z-ETVZT3yCc' zoom={8} markerPosition={{lat: -30.397, lng: 150.644}} />
))

addStory('marker point with info window', readme, () => (
  <Map apiKey='AIzaSyDwOkFSSCfh-3zjsjc4_JS5z-ETVZT3yCc' markerPosition={{lat: -33.8688, lng: 151.2093}} infoText='This is INFO WINDOW' />
))

addStory('start and end points', readme, () => (
  <Map apiKey='AIzaSyDwOkFSSCfh-3zjsjc4_JS5z-ETVZT3yCc' startPoint={{lat: -30.397, lng: 150.644}} endPoint={{lat: -32.397, lng: 150.644}} />
))

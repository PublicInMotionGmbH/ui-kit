import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Map from './src/Map'
import Directions from './src/Directions'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Map', module)

const apiKey = 'AIzaSyDwOkFSSCfh-3zjsjc4_JS5z-ETVZT3yCc'

// CONTROLLED
const tooltipStyle = {
  display: 'inline-block',
  backgroundColor: '#eee',
  padding: '1rem',
  margin: '25px 0',
  cursor: 'pointer'
}

function render (setState, state) {
  return (
    <div style={{ display: 'block' }}>
      <Map apiKey={apiKey} > <Directions startPoint={{lat: -33.397, lng: 140.644}} endPoint={state.destination} /> </Map>
      <span
        onClick={() => setState({ destination: {lat: -33.397, lng: 150.644} })}
        style={{
          ...tooltipStyle,
          backgroundColor: '#e00',
          color: '#fff',
          marginLeft: '150px'
        }}
      >
        Change destination
      </span>
    </div>
  )
}

function getInitialState () {
  return {
    destination: {lat: -29.397, lng: 150.644}
  }
}

// Stories
addStory('default', readme, () => (
  <Map apiKey={apiKey} />
))

addStory('marker point with zoom', readme, () => (
  <Map apiKey={apiKey} zoom={14} markerPosition={{lat: -27.5598, lng: 151.9507}} />
))

addStory('marker point with info window', readme, () => (
  <Map apiKey={apiKey} markerPosition={{lat: -33.8688, lng: 151.2093}} infoText='This is Info Window' />
))

addStory('map is not interactive', readme, () => (
  <Map apiKey={apiKey} zoom={10} markerPosition={{lat: 39.0392, lng: 121.7625}} interactive={false} />
))

addStory('directions', readme, () => (
  <Map apiKey={apiKey} > <Directions startPoint={{lat: -30.397, lng: 140.644}} endPoint={{lat: -31.397, lng: 150.644}} /> </Map>
))

addStory.controlled('change directions', readme, render, getInitialState)

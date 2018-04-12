import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Map from './src/Map'
import Marker from './src/Marker'
import Directions from './src/Directions'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Map', module, {
  propTypes: [ Map, Marker, Directions ]
})

const apiKey = 'AIzaSyDwOkFSSCfh-3zjsjc4_JS5z-ETVZT3yCc'

// CONTROLLED
const buttonStyle = {
  display: 'inline-block',
  padding: '1rem',
  margin: '25px 0',
  cursor: 'pointer',
  border: 0,
  font: 'inherit',
  backgroundColor: '#e00',
  color: '#fff'
}

const destinations = {
  0: { lat: -31.397, lng: 148.644 },
  1: { lat: -33.397, lng: 150.644 }
}

function render (setState, state) {
  const nextDestination = state.destination === destinations[0] ? destinations[1] : destinations[0]

  const toggle = () => setState({
    destination: nextDestination
  })

  return (
    <div style={{ display: 'block', textAlign: 'center' }}>
      <button onClick={toggle} style={buttonStyle}>
        Change destination<br />
        <small>to ({nextDestination.lat}, {nextDestination.lng})</small>
      </button>
      <Map style={{ height: '70vh' }} apiKey={apiKey}>
        <Directions startPoint={{ lat: -33.397, lng: 140.644 }} endPoint={state.destination} />
      </Map>
    </div>
  )
}

function getInitialState () {
  return {
    destination: destinations[0]
  }
}

// Stories
addStory('default', readme, () => (
  <Map style={{ height: '70vh' }} apiKey={apiKey} />
))

addStory('marker with zoom', readme, () => (
  <Map style={{ height: '70vh' }} apiKey={apiKey} zoom={14} center={{lat: -27.5598, lng: 151.9507}}>
    <Marker position={{lat: -27.5598, lng: 151.9507}} />
  </Map>
))

addStory('marker with info window', readme, () => (
  <Map style={{ height: '70vh' }} apiKey={apiKey} center={{lat: -33.8688, lng: 151.2093}}>
    <Marker
      position={{lat: -33.8688, lng: 151.2093}}
      info='This is Info Window'
    />
  </Map>
))

addStory('many markers', readme, () => (
  <Map style={{ height: '70vh' }} apiKey={apiKey} center={{lat: -33.8688, lng: 151.2093}}>
    <Marker position={{lat: -33.8688, lng: 151.2093}} />
    <Marker position={{lat: -32.8688, lng: 150.2093}} />
    <Marker position={{lat: -34.8688, lng: 151.2093}} />
  </Map>
))

addStory.controlled('controlled marker with info window', readme, (setState, state) => (
  <div style={{ display: 'block', textAlign: 'center' }}>
    <button onClick={() => setState({ open: !state.open })} style={buttonStyle}>
      Toggle info
    </button>

    <Map style={{ height: '70vh' }} apiKey={apiKey} center={{lat: -33.8688, lng: 151.2093}}>
      <Marker
        position={{lat: -33.8688, lng: 151.2093}}
        info='This is Info Window'
        open={state.open}
        onClose={() => setState({ open: false })}
      />
    </Map>
  </div>
), () => ({ open: false }))

addStory('map is not interactive', readme, () => (
  <Map style={{ height: '70vh' }} apiKey={apiKey} zoom={10} center={{lat: 39.0392, lng: 121.7625}} interactive={false} />
))

addStory('directions', readme, () => (
  <Map style={{ height: '70vh' }} apiKey={apiKey}>
    <Directions startPoint={{lat: -30.397, lng: 140.644}} endPoint={{lat: -31.397, lng: 150.644}} />
  </Map>
))

addStory('two directions', readme, () => (
  <Map style={{ height: '70vh' }} apiKey={apiKey}>
    <Directions startPoint={{lat: -30.397, lng: 140.644}} endPoint={{lat: -31.397, lng: 150.644}} />
    <Directions startPoint={{lat: -29.397, lng: 145.644}} endPoint={{lat: -33.397, lng: 145.644}} />
  </Map>
))

addStory.controlled('change directions', readme, render, getInitialState)

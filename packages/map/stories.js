import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Map from './src/Map'
import Marker from './src/Marker'
import Directions from './src/Directions'

const mapStyles = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5'
      }
    ]
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161'
      }
    ]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5'
      }
    ]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dadada'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5'
      }
    ]
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c9c9c9'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  }
]

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Map', module, {
  propTables: [ Map, Marker, Directions ]
})

// Set up Google Maps API key for UI Kit only
const apiKey = 'AIzaSyDwOkFSSCfh-3zjsjc4_JS5z-ETVZT3yCc'

// Build styles for button

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

// Set up all positions used by stories

const config = {
  zoom: { lat: -27.5598, lng: 151.9507 },
  interactive: { lat: 39.0392, lng: 121.7625 },
  markers: [
    { lat: -33.8688, lng: 151.2093 },
    { lat: -32.8688, lng: 150.2093 },
    { lat: -34.8688, lng: 151.2093 }
  ],
  path: {
    from: { lat: -30.397, lng: 140.644 },
    via: [
      { lat: -33.397, lng: 145.644 },
      { lat: -35.397, lng: 145.644 }
    ],
    to: { lat: -31.397, lng: 150.644 }
  },
  changing: {
    start: { lat: -33.397, lng: 140.644 },
    end: [
      { lat: -31.397, lng: 148.644 },
      { lat: -33.397, lng: 150.644 }
    ]
  },
  crossing: {
    from: { lat: -29.397, lng: 145.644 },
    to: { lat: -33.397, lng: 145.644 }
  }
}

// Stories

addStory('default', readme, () => (
  <Map style={{ height: '70vh' }} apiKey={apiKey} interactive={false} />
))

addStory('marker with zoom', readme, () => (
  <Map style={{ height: '70vh' }} apiKey={apiKey} zoom={14} center={config.zoom}>
    <Marker position={config.zoom} />
  </Map>
))

addStory('marker with info window', readme, () => (
  <Map style={{ height: '70vh' }} apiKey={apiKey} center={config.markers[0]}>
    <Marker
      position={config.markers[0]}
      info='This is Info Window'
    />
  </Map>
))

addStory('many markers', readme, () => (
  <Map style={{ height: '70vh' }} apiKey={apiKey} center={config.markers[0]}>
    <Marker position={config.markers[0]} />
    <Marker position={config.markers[1]} />
    <Marker position={config.markers[2]} />
  </Map>
))

addStory.controlled('controlled marker with info window', readme, (setState, state) => (
  <div style={{ display: 'block', textAlign: 'center' }}>
    <button onClick={() => setState({ open: !state.open })} style={buttonStyle}>
      Toggle info
    </button>

    <Map style={{ height: '70vh' }} apiKey={apiKey} center={config.markers[0]}>
      <Marker
        position={config.markers[0]}
        info='This is Info Window'
        open={state.open}
        onClose={() => setState({ open: false })}
      />
    </Map>
  </div>
), () => ({
  open: false
}))

addStory('map is not interactive', readme, () => (
  <Map style={{ height: '70vh' }} apiKey={apiKey} zoom={10} center={config.interactive} interactive={false} />
))

addStory('directions', readme, () => (
  <Map style={{ height: '70vh' }} apiKey={apiKey}>
    <Directions startPoint={config.path.from} endPoint={config.path.to} />
  </Map>
))

addStory('directions with single waypoint', readme, () => (
  <Map style={{ height: '70vh' }} apiKey={apiKey}>
    <Directions
      startPoint={config.path.from}
      via={config.path.via[0]}
      endPoint={config.path.to}
    />
  </Map>
))

addStory('directions with many waypoints', readme, () => (
  <Map style={{ height: '70vh' }} apiKey={apiKey}>
    <Directions
      startPoint={config.path.from}
      via={config.path.via}
      endPoint={config.path.to}
    />
  </Map>
))

addStory('two directions', readme, () => (
  <Map style={{ height: '70vh' }} apiKey={apiKey}>
    <Directions startPoint={config.path.from} endPoint={config.path.to} />
    <Directions startPoint={config.crossing.from} endPoint={config.crossing.to} />
  </Map>
))

addStory.controlled('change directions', readme, (setState, state) => {
  const nextDestination = state.destination === config.changing.end[0]
    ? config.changing.end[1]
    : config.changing.end[0]

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
        <Directions startPoint={config.changing.start} endPoint={state.destination} />
      </Map>
    </div>
  )
}, () => ({
  destination: config.changing.end[0]
}))

addStory('passed options', readme, () => (
  <Map style={{ height: '70vh' }} apiKey={apiKey} options={{ styles: mapStyles }} />
))

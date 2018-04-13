import React from 'react'
import { shallow } from 'enzyme'

import Directions from '../src/Directions'

const example = require('./directions-example.json')

describe('<Directions />', () => {
  let previousGoogle
  let routeFn

  beforeEach(() => {
    previousGoogle = global.google || window.google
    global.google = window.google = {
      maps: {
        Map: function () {
          this.setCenter = jest.fn()
          this.setOptions = jest.fn()
          this.setZoom = jest.fn()
        },
        DirectionsService: function () {
          this.route = routeFn = jest.fn()
        },
        LatLng: function (lat, lng) {
          this.lat = lat
          this.lng = lng
        },
        TravelMode: {
          DRIVING: 'driving'
        },
        DirectionsStatus: {
          OK: 'ok',
          ERROR: 'error'
        }
      }
    }
  })

  afterEach(() => {
    global.google = window.google = previousGoogle
  })

  it('direction is generate', () => {
    const wrapper = shallow(
      <Directions
        startPoint={{ lat: -30.397, lng: 140.644 }}
        endPoint={{ lat: -31.397, lng: 150.644 }}
      />
    )

    expect(wrapper.state('directions')).toBe(null)
  })

  it('`getRoute` has built correct options', () => {
    // Set up geo-points for test
    const startPoint = { lat: -30.397, lng: 140.644 }
    const endPoint = { lat: -31.397, lng: 150.644 }

    // Build shalow component
    const wrapper = shallow(
      <Directions
        startPoint={startPoint}
        endPoint={endPoint}
      />
    )

    // Run `loadDirections` method of `Directions` component
    // Which is calling DirectionsService for routing
    wrapper.instance().loadDirections(wrapper.props())

    // We expect routing to be called once
    expect(routeFn.mock.calls.length).toBe(1)

    // Get information about call for routing
    const [ options/* , callback */] = routeFn.mock.calls[0]

    // TODO: /via/
    // Check if `getRoute` has built correct options
    expect(options).toEqual({
      origin: startPoint,
      destination: endPoint,
      travelMode: 'driving'
    })
  })

  it('`getRoute` has built correct waypoints', () => {
    // Set up geo-points for test
    const startPoint = { lat: -30.397, lng: 140.644 }
    const endPoint = { lat: -31.397, lng: 150.644 }

    // Build shalow component
    const wrapper = shallow(
      <Directions
        startPoint={startPoint}
        endPoint={endPoint}
      />
    )

    // Run `loadDirections` method of `Directions` component
    // Which is calling DirectionsService for routing
    wrapper.instance().loadDirections(wrapper.props())

    // We expect routing to be called once
    expect(routeFn.mock.calls.length).toBe(1)

    // Get information about call for routing
    // const [ via, callback ] = routeFn.mock.calls[0]

    // console.log(via)

    // TODO: /via/
    // Check if `getRoute` has built correct waypoints
    // expect(options).toEqual({
    //   origin: startPoint,
    //   destination: endPoint,
    //   travelMode: 'driving'
    // })
  })

  it('renders children correctly', async () => {
    // Set up geo-points for test
    const startPoint = { lat: -30.397, lng: 140.644 }
    const endPoint = { lat: -31.397, lng: 150.644 }

    // Build shalow component
    const wrapper = shallow(
      <Directions
        startPoint={startPoint}
        endPoint={endPoint}
      />
    )

    // Run `loadDirections` method of `Directions` component
    // Which is calling DirectionsService for routing
    wrapper.instance().loadDirections(wrapper.props())

    // We expect routing to be caled once
    expect(routeFn.mock.calls.length).toBe(1)

    // Get information about call for routing
    const [ /* options, */ callback ] = routeFn.mock.calls[0]

    // Call asynchronously callback with proper value
    await callback(example, global.google.maps.DirectionsStatus.OK)

    // Expect directions to be put into component state
    expect(wrapper.state('directions')).not.toBe(null)
  })

  it('bbbbbbbbbbbbbbbb', () => {
    // const wrapper = shallow(<Directions startPoint={{ lat: -30.397, lng: 140.644 }} endPoint={{ lat: -31.397, lng: 150.644 }} />)
  })
})

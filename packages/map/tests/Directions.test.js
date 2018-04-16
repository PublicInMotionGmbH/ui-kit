import React from 'react'
import { shallow, mount } from 'enzyme'

import Directions from '../src/Directions'

const example = require('./fixtures/directions-example.json')
const example2 = require('./fixtures/directions-example-2.json')

describe('<Directions />', () => {
  let previousGoogle
  let routeFn

  beforeEach(() => {
    routeFn = jest.fn()
    previousGoogle = global.google || window.google
    global.google = window.google = {
      maps: {
        Map: function () {
          this.setCenter = jest.fn()
          this.setOptions = jest.fn()
          this.setZoom = jest.fn()
        },
        DirectionsService: function () {
          this.route = routeFn
        },
        DirectionsRenderer: function () {
          this.setDirections = jest.fn()
          this.setMap = jest.fn()
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
          ERROR: null
        }
      }
    }
  })

  afterEach(() => {
    global.google = window.google = previousGoogle
  })

  it('should not have directions on beginning', () => {
    const wrapper = shallow(
      <Directions
        startPoint={{ lat: -30.397, lng: 140.644 }}
        endPoint={{ lat: -31.397, lng: 150.644 }}
      />
    )

    expect(wrapper.state('directions')).toBe(null)
  })

  it('should load directions on mount', async () => {
    // Set up geo-points for test
    const startPoint = { lat: -30.397, lng: 140.644 }
    const endPoint = { lat: -31.397, lng: 150.644 }

    // Build shalow component
    const wrapper = mount(
      <Directions
        startPoint={startPoint}
        endPoint={endPoint}
      />
    )
    // We expect routing to be caled once
    expect(routeFn.mock.calls.length).toBe(1)

    // Get information about call for routing
    const [ , callback ] = routeFn.mock.calls[0]

    // Call asynchronously callback with proper value
    await callback(example, global.google.maps.DirectionsStatus.OK)

    // Expect directions to be put into component state
    expect(wrapper.state('directions')).not.toBe(null)
  })

  it('should change directions inside when they are changed', async () => {
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

    // We expect routing to be called once
    expect(routeFn.mock.calls.length).toBe(1)

    // Get information about call for routing
    const [ , callback ] = routeFn.mock.calls[0]

    // Call asynchronously callback with proper value
    await callback(example, global.google.maps.DirectionsStatus.OK)

    // Update new coordinates
    wrapper.setProps({
      startPoint: { lat: -31.397, lng: 140.644 },
      endPoint: { lat: -32.397, lng: 140.644 }
    })

    // We expect routing to be called second time
    expect(routeFn.mock.calls.length).toBe(2)

    // Get information about call for routing
    const [ , callback2 ] = routeFn.mock.calls[1]

    // Call asynchronously callback with proper value
    await callback2(example2, global.google.maps.DirectionsStatus.OK)

    // Expect directions to be put into component state
    expect(wrapper.state('directions')).toEqual(example2)
  })

  it('should use new directions when previous are not loaded and it is changed', async () => {
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

    // We expect routing to be called once
    expect(routeFn.mock.calls.length).toBe(1)

    // Update new coordinates
    wrapper.setProps({
      startPoint: { lat: -31.397, lng: 140.644 },
      endPoint: { lat: -32.397, lng: 140.644 }
    })

    // We expect routing to be called second time
    expect(routeFn.mock.calls.length).toBe(2)

    // Get information about call for routing
    const [ , callback2 ] = routeFn.mock.calls[1]

    // Call asynchronously callback with proper value
    await callback2(example2, global.google.maps.DirectionsStatus.OK)

    // Expect directions to be put into component state
    expect(wrapper.state('directions')).toEqual(example2)
  })

  it('should change directions inside when they are changed', async () => {
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

    // We expect routing to be called once
    expect(routeFn.mock.calls.length).toBe(1)

    // Get information about call for routing
    const [ , callback ] = routeFn.mock.calls[0]

    // Call asynchronously callback with proper value
    await callback(example, global.google.maps.DirectionsStatus.OK)

    // Update new coordinates
    wrapper.setProps({
      startPoint: { lat: -31.397, lng: 140.644 },
      endPoint: { lat: -32.397, lng: 140.644 }
    })

    // We expect routing to be called second time
    expect(routeFn.mock.calls.length).toBe(2)

    // Get information about call for routing
    const [ , callback2 ] = routeFn.mock.calls[1]

    // Call asynchronously callback with proper value
    await callback2(example2, global.google.maps.DirectionsStatus.OK)

    // Expect directions to be put into component state
    expect(wrapper.state('directions')).toEqual(example2)
  })

  it('should call `handleError` on Google Maps error', async () => {
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

    // Reset call counter
    routeFn.mockReset()

    // Create spy function on `handleError` place
    const spy = jest.fn()
    wrapper.instance().handleError = spy

    // Update new coordinates
    wrapper.setProps({
      startPoint: { lat: -31.397, lng: 140.644 },
      endPoint: { lat: -32.397, lng: 140.644 }
    })

    // Get information about call for routing
    const [ , callback ] = routeFn.mock.calls[0]

    // Call asynchronously callback with proper value
    await callback(null, global.google.maps.DirectionsStatus.ERROR)

    // Expect directions to be put into component state
    expect(spy.mock.calls.length).toBe(1)
  })

  it('should ignore previous response when directions has already changed', async () => {
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

    // Update new coordinates
    wrapper.setProps({
      startPoint: { lat: -31.397, lng: 140.644 },
      endPoint: { lat: -32.397, lng: 140.644 }
    })

    // Get information about call for routing
    const [ , previousCallback ] = routeFn.mock.calls[0]

    // Call asynchronously callback with proper value
    await previousCallback(example, global.google.maps.DirectionsStatus.OK)

    // Expect directions to be put into component state
    expect(wrapper.state('directions')).toBe(null)
  })
})

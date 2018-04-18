import React from 'react'
import { shallow, mount } from 'enzyme'

import GoogleMapsMock from './utils/GoogleMapsMock'

import Directions from '../src/Directions'

const example = require('./fixtures/directions-example.json')
const example2 = require('./fixtures/directions-example-2.json')

describe('<Directions />', () => {
  let mock

  beforeEach(() => (mock = GoogleMapsMock.create()))
  afterEach(() => mock.detach())

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

    // Get mock function for routing
    const routeFn = mock.DirectionsService.route

    // We expect routing to be caled once
    expect(routeFn.mock.calls.length).toBe(1)

    // Get information about call for routing
    const [ , callback ] = routeFn.mock.calls[0]

    // Call asynchronously callback with proper value
    await callback(example, mock.DirectionsStatus.OK)

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

    // Get mock function for routing
    const routeFn = mock.DirectionsService.route

    // We expect routing to be called once
    expect(routeFn.mock.calls.length).toBe(1)

    // Get information about call for routing
    const [ , callback ] = routeFn.mock.calls[0]

    // Call asynchronously callback with proper value
    await callback(example, mock.DirectionsStatus.OK)

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
    await callback2(example2, mock.DirectionsStatus.OK)

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

    // Get mock function for routing
    const routeFn = mock.DirectionsService.route

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
    await callback2(example2, mock.DirectionsStatus.OK)

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

    // Get mock function for routing
    const routeFn = mock.DirectionsService.route

    // We expect routing to be called once
    expect(routeFn.mock.calls.length).toBe(1)

    // Get information about call for routing
    const [ , callback ] = routeFn.mock.calls[0]

    // Call asynchronously callback with proper value
    await callback(example, mock.DirectionsStatus.OK)

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
    await callback2(example2, mock.DirectionsStatus.OK)

    // Expect directions to be put into component state
    expect(wrapper.state('directions')).toEqual(example2)
  })

  it('should call `onError` callback on Google Maps error', async () => {
    // Set up geo-points for test
    const startPoint = { lat: -30.397, lng: 140.644 }
    const endPoint = { lat: -31.397, lng: 150.644 }

    // Create spy for errors
    const spy = jest.fn()

    // Build shalow component
    shallow(
      <Directions
        startPoint={startPoint}
        endPoint={endPoint}
        onError={spy}
      />
    )

    // Get mock function for routing
    const routeFn = mock.DirectionsService.route

    // Get information about call for routing
    const [ , callback ] = routeFn.mock.calls[0]

    // Call asynchronously callback with proper value
    await callback(null, mock.DirectionsStatus.ERROR)

    // Expect directions to be put into component state
    expect(spy.mock.calls.length).toBe(1)
  })

  it('should call `onLoad` callback on Google Maps error', async () => {
    // Set up geo-points for test
    const startPoint = { lat: -30.397, lng: 140.644 }
    const endPoint = { lat: -31.397, lng: 150.644 }

    // Create spy for errors
    const spy = jest.fn()

    // Build shalow component
    shallow(
      <Directions
        startPoint={startPoint}
        endPoint={endPoint}
        onLoad={spy}
      />
    )

    // Get mock function for routing
    const routeFn = mock.DirectionsService.route

    // Get information about call for routing
    const [ , callback ] = routeFn.mock.calls[0]

    // Call asynchronously callback with proper value
    await callback(example, mock.DirectionsStatus.OK)

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

    // Get mock function for routing
    const routeFn = mock.DirectionsService.route

    // Get information about call for routing
    const [ , previousCallback ] = routeFn.mock.calls[0]

    // Call asynchronously callback with proper value
    await previousCallback(example, mock.DirectionsStatus.OK)

    // Expect directions to be put into component state
    expect(wrapper.state('directions')).toBe(null)
  })

  it('should not load new directions when they are empty', () => {
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

    // Get mock function for routing
    const routeFn = mock.DirectionsService.route

    // We expect routing to be called first time
    expect(routeFn.mock.calls.length).toBe(1)

    // Update new coordinates
    wrapper.setProps({
      startPoint: null,
      endPoint: null
    })

    // We expect routing to be not called second time
    expect(routeFn.mock.calls.length).toBe(1)
  })

  it('should not load directions on beginning when they are empty', () => {
    // Set up geo-points for test
    const startPoint = { lat: -30.397, lng: 140.644 }
    const endPoint = { lat: -31.397, lng: 150.644 }

    // Build shalow component
    const wrapper = shallow(
      <Directions
        startPoint={null}
        endPoint={null}
      />
    )

    // Get mock function for routing
    const routeFn = mock.DirectionsService.route

    // We expect routing to be called first time
    expect(routeFn.mock.calls.length).toBe(0)

    // Update new coordinates
    wrapper.setProps({
      startPoint: startPoint,
      endPoint: endPoint
    })

    // We expect routing to be not called second time
    expect(routeFn.mock.calls.length).toBe(1)
  })
})

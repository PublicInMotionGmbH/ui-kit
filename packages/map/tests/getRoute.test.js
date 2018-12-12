import GoogleMapsMock from './utils/GoogleMapsMock'

import getRoute from '../src/utils/getRoute'

describe('getRoute', () => {
  let mock

  beforeEach(() => (mock = GoogleMapsMock.create()))
  afterEach(() => mock.detach())

  it('should build correct options', () => {
    // Set up geo-points for test
    const startPoint = { lat: -30.397, lng: 140.644 }
    const endPoint = { lat: -31.397, lng: 150.644 }

    getRoute(startPoint, endPoint)

    // Get mock function for routing
    const routeFn = mock.DirectionsService.route

    // We expect routing to be called once
    expect(routeFn.mock.calls.length).toBe(1)

    // Get information about call for routing
    const [ options ] = routeFn.mock.calls[0]

    // Check if `getRoute` has built correct options
    expect(options).toEqual({
      origin: startPoint,
      destination: endPoint,
      travelMode: 'driving'
    })
  })

  it('should build correct waypoints', () => {
    // Set up geo-points for test
    const startPoint = { lat: -30.397, lng: 140.644 }
    const endPoint = { lat: -31.397, lng: 150.644 }
    const waypointA = { lat: -33.397, lng: 145.644 }
    const waypointB = { lat: -35.397, lng: 145.644 }
    const waypoints = [ waypointA, waypointB ]

    getRoute(startPoint, endPoint, waypoints)

    // Get mock function for routing
    const routeFn = mock.DirectionsService.route

    // We expect routing to be called once
    expect(routeFn.mock.calls.length).toBe(1)

    // Get information about call for routing
    const [ via ] = routeFn.mock.calls[0]

    // Check if `getRoute` has built correct waypoints
    expect(via.waypoints).toEqual([
      { location: waypointA, stopover: true },
      { location: waypointB, stopover: true }
    ])
  })

  it('should resolve after receiving route', async () => {
    // Set up geo-points for test
    const startPoint = { lat: -30.397, lng: 140.644 }
    const endPoint = { lat: -31.397, lng: 150.644 }

    // Try to get routing
    const promise = getRoute(startPoint, endPoint).then(
      () => (promise.success = true),
      () => (promise.error = true)
    )

    // Expect it to not be resolved yet
    expect(promise.success).not.toBe(true)
    expect(promise.error).not.toBe(true)

    // Get mock function for routing
    const routeFn = mock.DirectionsService.route

    // Get information about call for routing
    const [ , callback ] = routeFn.mock.calls[0]

    // Build example
    const example = {}

    // Resolve routing with success
    await callback(example, mock.DirectionsStatus.OK)

    expect(promise.success).toBe(true)
    expect(promise.error).not.toBe(true)
  })

  it('should reject after receiving route', async () => {
    // Set up geo-points for test
    const startPoint = { lat: -30.397, lng: 140.644 }
    const endPoint = { lat: -31.397, lng: 150.644 }

    // Try to get routing
    const promise = getRoute(startPoint, endPoint).then(
      () => (promise.success = true),
      () => (promise.error = true)
    )

    // Expect it to not be resolved yet
    expect(promise.success).not.toBe(true)
    expect(promise.error).not.toBe(true)

    // Get mock function for routing
    const routeFn = mock.DirectionsService.route

    // Get information about call for routing
    const [ , callback ] = routeFn.mock.calls[0]

    // Resolve routing with success
    await callback(null, mock.DirectionsStatus.ERROR)

    expect(promise.success).not.toBe(true)
    expect(promise.error).toBe(true)
  })
})

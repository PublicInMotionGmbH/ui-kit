import getRoute from '../utils/getRoute'

describe('getRoute', () => {
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

  it('should built correct options', () => {
    // Set up geo-points for test
    const startPoint = { lat: -30.397, lng: 140.644 }
    const endPoint = { lat: -31.397, lng: 150.644 }

    getRoute(startPoint, endPoint)

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

  it('should built correct waypoints', () => {
    // Set up geo-points for test
    const startPoint = { lat: -30.397, lng: 140.644 }
    const endPoint = { lat: -31.397, lng: 150.644 }
    const waypointA = { lat: -33.397, lng: 145.644 }
    const waypointB = { lat: -35.397, lng: 145.644 }
    const waypoints = [waypointA, waypointB]
    getRoute(startPoint, endPoint, waypoints)

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
})

function getCurrentGoogleApi () {
  if (typeof global !== 'undefined' && global.google) {
    return global.google
  }

  if (typeof window !== 'undefined' && window.google) {
    return window.google
  }

  return null
}

function GoogleMapsMock () {
  this.Map = function MapMock () {}
  this.Map.prototype.setCenter = this.Map.setCenter = jest.fn()
  this.Map.prototype.setOptions = this.Map.setOptions = jest.fn()
  this.Map.prototype.setZoom = this.Map.setZoom = jest.fn()

  this.DirectionsService = function DirectionsServiceMock () {}
  this.DirectionsService.prototype.route = this.DirectionsService.route = jest.fn()

  this.DirectionsRenderer = function DirectionsRendererMock () {}
  this.DirectionsRenderer.prototype.setMap = this.DirectionsRenderer.setMap = jest.fn()
  this.DirectionsRenderer.prototype.setDirections = this.DirectionsRenderer.setDirections = jest.fn()

  this.LatLng = function LatLngMock (lat, lng) {
    this.lat = lat
    this.lng = lng
  }

  this.Marker = function MarkerMock () {}
  this.Marker.prototype.setPosition = this.Marker.setPosition = jest.fn()
  this.Marker.prototype.setMap = this.Marker.setMap = jest.fn()

  this.InfoWindow = function InfoWindow () {}
  this.InfoWindow.prototype.setMap = this.InfoWindow.setMap = jest.fn()

  this.TravelMode = {
    DRIVING: 'driving'
  }

  this.DirectionsStatus = {
    OK: 'ok',
    ERROR: null
  }

  this.event = {
    addListener: jest.fn()
  }

  const mocks = [
    this.Map.setCenter,
    this.Map.setOptions,
    this.Map.setZoom,
    this.DirectionsService.route,
    this.DirectionsRenderer.setDirections,
    this.DirectionsRenderer.setMap,
    this.Marker.setPosition,
    this.Marker.setMap,
    this.InfoWindow.setMap,
    this.event.addListener
  ]

  this.reset = function resetGoogleMapsMock () {
    for (let i = 0; i < mocks.length; i++) {
      mocks[i].mockReset()
    }
  }
}

GoogleMapsMock.prototype.attach = function attachGoogleMapsMock () {
  if (this.previousGoogle !== undefined) {
    return
  }

  this.previousGoogle = getCurrentGoogleApi()

  if (typeof global !== 'undefined') {
    global.google = { maps: this }
  }

  if (typeof window !== 'undefined') {
    window.google = { maps: this }
  }
}

GoogleMapsMock.prototype.detach = function detachGoogleMapsMock () {
  if (this.previousGoogle === undefined) {
    return
  }

  if (typeof global !== 'undefined') {
    global.google = this.previousGoogle
  }

  if (typeof window !== 'undefined') {
    window.google = this.previousGoogle
  }

  delete this.previousGoogle
}

GoogleMapsMock.create = function createGoogleMapsMock () {
  const mock = new GoogleMapsMock()

  mock.attach()

  return mock
}

export default GoogleMapsMock

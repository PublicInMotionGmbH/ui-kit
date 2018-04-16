/**
 * Get route from start to end point from Google Maps API
 *
 * @param {object|{ lat: number, lng: number }} startPoint
 * @param {object|{ lat: number, lng: number }} endPoint
 * @param {object[]|Array<{ lat: number, lng: number }>|{ lat: number, lng: number }} [waypoints]
 * @returns {Promise<object, *>}
 */
function getRoute (startPoint, endPoint, waypoints) {
  const google = window.google
  const DirectionsService = new google.maps.DirectionsService()

  const options = {
    origin: new google.maps.LatLng(startPoint.lat, startPoint.lng),
    destination: new google.maps.LatLng(endPoint.lat, endPoint.lng),
    travelMode: google.maps.TravelMode.DRIVING
  }

  waypoints = [].concat(waypoints).filter(Boolean).map(location => ({
    location: new google.maps.LatLng(location.lat, location.lng),
    stopover: true
  }))

  if (waypoints.length) {
    options.waypoints = waypoints
  }

  return new Promise((resolve, reject) => {
    DirectionsService.route(options, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        window.x = result
        resolve(result)
      } else {
        reject(result)
      }
    })
  })
}

export default getRoute

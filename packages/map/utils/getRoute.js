/**
 * Get route from start to end point from Google Maps API
 *
 * @param {object|{ lat: number, lng: number }} startPoint
 * @param {object|{ lat: number, lng: number }} endPoint
 * @returns {Promise<object, *>}
 */
function getRoute (startPoint, endPoint) {
  const google = window.google
  const DirectionsService = new google.maps.DirectionsService()

  return new Promise((resolve, reject) => {
    DirectionsService.route({
      origin: new google.maps.LatLng(startPoint.lat, startPoint.lng),
      destination: new google.maps.LatLng(endPoint.lat, endPoint.lng),
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        resolve(result)
      } else {
        reject(result)
      }
    })
  })
}

export default getRoute

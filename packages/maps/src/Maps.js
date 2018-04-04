import {isEqual as _isEqual} from 'lodash'
import React, {Component} from 'react'

import {GoogleApiWrapper, Map} from 'google-maps-react'
import {mapiClient} from '../utils/client'

const GOOGLE_MAPS_API_KEY = 'AIzaSyDwOkFSSCfh-3zjsjc4_JS5z-ETVZT3yCc'

class Maps extends Component {
  constructor (props) {
    super(props)
    this.state = {
      directionsService: null,
      directionsDisplay: null,
      placesService: null,
      map: null
    }
    this.handleMapReady = this.handleMapReady.bind(this)
    this.updateRoute = this.updateRoute.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
  }

  handleMapReady (mapProps, map) {
    const {google} = mapProps
    let directionsDisplay = new google.maps.DirectionsRenderer()
    directionsDisplay.setMap(map)
    this.setState({
      directionsService: new google.maps.DirectionsService(),
      placesService: new google.maps.places.PlacesService(map),
      directionsDisplay: directionsDisplay,
      map: map
    })
    this.updateRoute(this.props.startLocation, this.props.endLocation)
  }

  ensureGeometry (element) {
    return new Promise((resolve, reject) => {
      element.latLng && resolve(element.latLng)
      if (!element.geometry && this.state.placesService && element.place_id) {
        mapiClient.get('geo/location_by_place_id/', {
          params: {
            place_id: element.place_id,
            address: element.address
          }
        }).then(function ({data}) {
          resolve({lat: data.latitude, lng: data.longitude})
        })
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    if (_isEqual(nextProps.startLocation, this.props.startLocation) && _isEqual(nextProps.endLocation, this.props.endLocation)) return
    this.updateRoute(nextProps.startLocation, nextProps.endLocation)
  }

  async updateRoute (startLocation, endLocation) {
    if (!(this.state.directionsService && startLocation && endLocation)) return
    const startCords = await this.ensureGeometry(startLocation)
    const endCords = await this.ensureGeometry(endLocation)
    this.state.directionsService.route(
      {
        origin: startCords,
        destination: endCords,
        travelMode: 'DRIVING'
      },
      (response, status) => {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        if (status === 'OK') {
          this.state.directionsDisplay.setDirections(response)
        }
      }
    )
  }

  render () {
    return (
      <div className='Maps'>
        <Map
          onReady={this.handleMapReady}
          google={this.props.google}
          zoom={7}
        />
      </div>
    )
  }
}

export {Maps}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY,
  libraries: ['directions', 'places'],
  version: '3.31'
})(Maps)

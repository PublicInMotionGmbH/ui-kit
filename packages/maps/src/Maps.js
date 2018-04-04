import {isEqual as _isEqual} from 'lodash'
import React, {Component} from 'react'

import {GoogleApiWrapper, Map, Marker, InfoWindow} from 'google-maps-react'

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

  componentWillReceiveProps (nextProps) {
    if (_isEqual(nextProps.startLocation, this.props.startLocation) && _isEqual(nextProps.endLocation, this.props.endLocation)) return
    this.updateRoute(nextProps.startLocation, nextProps.endLocation)
  }

  async updateRoute (startLocation, endLocation) {
    if (endLocation == null) {

    }
    if (!(this.state.directionsService && startLocation && endLocation)) return
    const startCords = this.props.startLocation
    const endCords = this.props.endLocation
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
          zoom={this.props.zoom}
          initialCenter={this.props.initialCenter} >
          <Marker />
          <InfoWindow visible>
            <div>
              <h1>THIS IS INFOBOX</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

export {Maps}

export default GoogleApiWrapper({
  libraries: ['directions', 'places'],
  version: '3.31'
})(Maps)

import React from 'react'
import PropTypes from 'prop-types'
import { compose, withProps, withStateHandlers, lifecycle } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, DirectionsRenderer } from 'react-google-maps'

import { prefix } from '@talixo/shared'

const moduleName = prefix('map')

const mapProps = withProps(props => {
  return {
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${props.apiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }
})

const stateHandlers = withStateHandlers(() => ({
  isOpen: false
}), {
  onToggleOpen: ({ isOpen }) => () => ({
    isOpen: !isOpen
  })
})

const lifeCycle = lifecycle({
  componentDidMount () {
    if ((this.props.startPoint || this.props.endPoint) == null) { return }
    const google = window.google
    const DirectionsService = new google.maps.DirectionsService()
    DirectionsService.route({
      origin: new google.maps.LatLng(this.props.startPoint.lat, this.props.startPoint.lng),
      destination: new google.maps.LatLng(this.props.endPoint.lat, this.props.endPoint.lng),
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result
        })
      } else {
        console.error(`error fetching directions ${result}`)
      }
    })
  }
})

const MapComponent = compose(
  mapProps,
  stateHandlers,
  withScriptjs,
  withGoogleMap,
  lifeCycle
)((props) =>
  <GoogleMap
    defaultZoom={props.zoom}
    defaultCenter={props.markerPosition || {lat: 37.774929, lng: -122.419416}}
    defaultOptions={{
      draggable: props.interactive || false,
      scrollwheel: props.interactive || false,
      zoomControl: props.interactive || false
    }}
  >
    {props.isMarkerShown && <Marker position={props.markerPosition} onClick={props.onToggleOpen}>
      {(props.isOpen && props.infoText) && <InfoWindow>
        <span>{props.infoText}</span>
      </InfoWindow>} </Marker>}
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
)

/**
 * Component which represents Map.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.apiKey]
 * @param {number} [props.zoom]
 * @param {object} [props.markerPosition]
 * @param {object} [props.startPoint]
 * @param {object} [props.endPoint]
 * @param {string} [props.infoText]
 * @returns {React.Element}
 */
class Map extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isMarkerShown: false
    }
  }

  componentDidMount (props) {
    this.setState({ isMarkerShown: !!this.props.markerPosition })
  }

  render () {
    const { apiKey, zoom, markerPosition, startPoint, endPoint, infoText, interactive, ...passedProps } = this.props
    const { isMarkerShown } = this.state
    return (
      <MapComponent
        className={moduleName}
        apiKey={apiKey}
        zoom={zoom}
        isMarkerShown={isMarkerShown}
        markerPosition={markerPosition}
        startPoint={startPoint}
        endPoint={endPoint}
        infoText={infoText}
        interactive={interactive}
        {...passedProps}
      />
    )
  }
}

Map.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Your Api Key from GoogleMaps */
  apiKey: PropTypes.string.isRequired,

  /** Zoom */
  zoom: PropTypes.number,

  /** Position of Marker */
  markerPosition: PropTypes.object,

  /** Start point */
  startPoint: PropTypes.object,

  /** End point */
  endPoint: PropTypes.object,

  /** Text in InfoWindow */
  infoText: PropTypes.string,

  /** Map is interactive */
  interactive: PropTypes.bool
}

Map.defaultProps = {
  zoom: 6,
  interactive: true
}

export default Map

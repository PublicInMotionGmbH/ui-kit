import React from 'react'
import PropTypes from 'prop-types'
import { compose, withProps } from 'recompose'
import { withGoogleMap, GoogleMap } from 'react-google-maps'

import { buildClassName } from '@talixo/shared'

import withGoogleMapsApi from './withGoogleMapsApi'

import { Location } from './PropTypes'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** URL for Google Maps API */
  googleMapsApiUrl: PropTypes.string,

  /** It will allow to load Google Maps API inside without credentials */
  allowDevelopmentApi: PropTypes.bool,

  /** Your API Key from Google Maps */
  apiKey: PropTypes.string,

  /** Your client ID from Google Maps */
  clientId: PropTypes.string,

  /** Zoom */
  zoom: PropTypes.number,

  /** Map center */
  center: Location,

  /** Is map interactive? */
  interactive: PropTypes.bool
}

const defaultProps = {
  zoom: 6,
  interactive: true,
  center: { lat: 52.5169974, lng: 13.2882608 },
  googleMapsApiUrl: 'https://maps.googleapis.com/maps/api',
  allowDevelopmentApi: false
}

/**
 * Map properties into understandable by react-google-maps
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} props.googleMapsApiUrl
 * @param {boolean} [props.allowDevelopmentApi]
 * @param {string} [props.apiKey]
 * @param {string} [props.clientId]
 * @param {number} [props.zoom]
 * @param {object} [props.center]
 * @returns {React.Element}
 */
const mapProps = withProps(props => {
  const { zoom, center, interactive, googleMapsApiUrl, allowDevelopmentApi, apiKey, clientId, className, ...passedProps } = props

  const clsName = buildClassName('map', className, {
    'non-interactive': !interactive
  })

  const loadingClsName = buildClassName([ 'map', 'element' ], className, 'loading')
  const readyClsName = buildClassName([ 'map', 'element' ], className)

  const auth = clientId
    ? 'client=' + encodeURIComponent(clientId) + '&'
    : apiKey
      ? 'key=' + encodeURIComponent(apiKey) + '&'
      : ''

  const data = {
    loadingElement: <div className={loadingClsName} />,
    containerElement: <div className={clsName} {...passedProps} />,
    mapElement: <div className={readyClsName} />
  }

  if (!allowDevelopmentApi && auth === '') {
    return data
  }

  return {
    googleMapURL: `${googleMapsApiUrl}/js?${auth}v=3.exp&libraries=geometry,drawing,places`,
    ...data
  }
})

const decorate = compose(mapProps, withGoogleMapsApi, withGoogleMap)

const getOptions = (interactive) => {
  return interactive ? {} : {
    draggable: false,
    scrollwheel: false,
    zoomControl: false,
    disableDefaultUI: false,
    fullscreenControl: false,
    keyboardShortcuts: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false
  }
}

/**
 * Component which represents Map.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.apiKey]
 * @param {number} [props.zoom]
 * @param {object} [props.center]
 * @returns {React.Element}
 */
const Map = decorate(props => {
  const options = getOptions(props.interactive)

  return (
    <GoogleMap
      defaultZoom={props.zoom}
      defaultCenter={props.center}
      defaultOptions={options}
    >
      {props.children}
    </GoogleMap>
  )
})

Map.displayName = 'Map'

Map.propTypes = propTypes
Map.defaultProps = defaultProps

export default Map

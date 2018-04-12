import React from 'react'
import PropTypes from 'prop-types'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'

import { buildClassName } from '@talixo/shared'

import { Location } from './PropTypes'

/**
 * Map properties into understandable by react-google-maps
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.apiKey]
 * @param {number} [props.zoom]
 * @param {object} [props.center]
 * @returns {React.Element}
 */
const mapProps = withProps(props => {
  const { zoom, center, interactive, apiKey, className, ...passedProps } = props

  const clsName = buildClassName('map', className, {
    'non-interactive': !interactive
  })
  const loadingClsName = buildClassName([ 'map', 'element' ], className, 'loading')
  const readyClsName = buildClassName([ 'map', 'element' ], className)

  return {
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div className={loadingClsName} />,
    containerElement: <div className={clsName} {...passedProps} />,
    mapElement: <div className={readyClsName} />
  }
})

const decorate = compose(mapProps, withScriptjs, withGoogleMap)

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
  const options = props.interactive ? {} : {
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

Map.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Your Api Key from GoogleMaps */
  apiKey: PropTypes.string.isRequired,

  /** Zoom */
  zoom: PropTypes.number,

  /** Map center */
  center: Location,

  /** Is map interactive? */
  interactive: PropTypes.bool
}

Map.defaultProps = {
  zoom: 6,
  interactive: true,
  center: { lat: 52.5169974, lng: 13.2882608 }
}

export default Map

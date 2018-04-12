import React from 'react'
import PropTypes from 'prop-types'
import { DirectionsRenderer } from 'react-google-maps'
import _ from 'lodash'

import { Location } from './PropTypes'

import getRoute from '../utils/getRoute'

/**
 * Check if Directions props has changed
 *
 * @param {object} props
 * @param {object|{ lat: number, lng: number }} props.startPoint
 * @param {object|{ lat: number, lng: number }} props.endPoint
 * @param {object[]|Array<{ lat: number, lng: number }>} [props.via]
 *
 * @param {object} nextProps
 * @param {object|{ lat: number, lng: number }} nextProps.startPoint
 * @param {object|{ lat: number, lng: number }} nextProps.endPoint
 * @param {object[]|Array<{ lat: number, lng: number }>} [nextProps.via]
 *
 * @returns {boolean}
 */
function hasPropsChanged (props, nextProps) {
  return (
    !_.isEqual(props.startPoint, nextProps.startPoint) ||
    !_.isEqual(props.endPoint, nextProps.endPoint) ||
    !_.isEqual(props.via || [], nextProps.via || [])
  )
}

/**
 * Component which represents Directions.
 *
 * @param {object} props
 * @param {object} [props.directions]
 * @returns {React.Element}
 */
class Directions extends React.PureComponent {
  /**
   * Update route when points has changed
   *
   * @param {object} props
   * @param {object|{ lat: number, lng: number }} props.startPoint
   * @param {object|{ lat: number, lng: number }} props.endPoint
   * @param {object[]|Array<{ lat: number, lng: number }>} [props.via]
   */
  constructor (props) {
    super(props)

    this.handleRoute = this.handleRoute.bind(this)
    this.handleError = this.handleError.bind(this)

    this.state = {
      directions: null
    }
  }

  /**
   * Load directions when component is mounted
   */
  componentDidMount () {
    this.loadDirections(this.props)
  }

  /**
   * Update route when points has changed
   *
   * @param {object} nextProps
   * @param {object|{ lat: number, lng: number }} nextProps.startPoint
   * @param {object|{ lat: number, lng: number }} nextProps.endPoint
   * @param {object[]|Array<{ lat: number, lng: number }>} props.via
   */
  componentWillReceiveProps (nextProps) {
    // When any point has changed, load directions again
    if (hasPropsChanged(this.props, nextProps)) {
      this.loadDirections(nextProps)
    }
  }

  /**
   * Load directions from Google
   *
   * @param {object} nextProps
   * @param {object|{ lat: number, lng: number }} nextProps.startPoint
   * @param {object|{ lat: number, lng: number }} nextProps.endPoint
   */
  loadDirections (nextProps) {
    if (nextProps.startPoint == null || nextProps.endPoint == null) {
      return
    }

    getRoute(nextProps.startPoint, nextProps.endPoint, nextProps.via).then(
      this.handleRoute.bind(this, nextProps.startPoint, nextProps.endPoint, nextProps.via),
      this.handleError
    )
  }

  /**
   * Handle found route
   *
   * @param {object|{ lat: number, lng: number }} startPoint
   * @param {object|{ lat: number, lng: number }} endPoint
   * @param {object[]|Array<{ lat: number, lng: number }>} via
   * @param {*} directions
   */
  handleRoute (startPoint, endPoint, via, directions) {
    // Ignore route for old directions, otherwise we've got race condition
    if (hasPropsChanged({ startPoint, endPoint, via }, this.props)) {
      return
    }

    // Update current directions
    this.setState({ directions })
  }

  /**
   * Handle error while searching for route
   *
   * @param {*} error
   */
  handleError (error) {
    console.error(`error fetching directions ${error}`)
  }

  render () {
    const { directions } = this.state

    if (!directions) {
      return null
    }

    return (
      <DirectionsRenderer directions={directions} />
    )
  }
}

Directions.propTypes = {
  /** Start point */
  startPoint: Location.isRequired,

  /** End point */
  endPoint: Location.isRequired,

  /** Waypoints */
  via: PropTypes.oneOfType([
    PropTypes.arrayOf(Location),
    Location
  ])
}

export default Directions

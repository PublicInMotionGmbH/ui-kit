import React from 'react'
import PropTypes from 'prop-types'
import { DirectionsRenderer } from 'react-google-maps'

import { Location } from './PropTypes'

import getRoute from '../utils/getRoute'
import hasPropsChanged from '../utils/hasPropsChanged'

const propTypes = {
  /** Start point */
  startPoint: Location,

  /** End point */
  endPoint: Location,

  /** Function fired when direction routing is loaded */
  onLoad: PropTypes.func,

  /** Function fired when direction routing caused error */
  onError: PropTypes.func,

  /** Waypoints */
  via: PropTypes.oneOfType([
    PropTypes.arrayOf(Location),
    Location
  ])
}

/**
 * Component which represents Directions.
 *
 * @property {object} props
 * @property {object|{ lat: number, lng: number }} props.startPoint
 * @property {object|{ lat: number, lng: number }} props.endPoint
 * @property {object[]|Array<{ lat: number, lng: number }>} [props.via]
 *
 * @property {object} state
 * @property {object|null} state.directions
 *
 * @class
 */
class Directions extends React.PureComponent {
  state = {
    directions: null
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
   * @param {object[]|Array<{ lat: number, lng: number }>} nextProps.via
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

    return getRoute(nextProps.startPoint, nextProps.endPoint, nextProps.via).then(
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
    const { onLoad } = this.props

    // Ignore route for old directions, otherwise we've got race condition
    if (hasPropsChanged({ startPoint, endPoint, via }, this.props)) {
      return
    }

    if (onLoad) {
      onLoad()
    }

    // Update current directions
    this.setState({ directions })
  }

  /**
   * Handle error while searching for route
   *
   * @param {*} error
   */
  handleError = (error) => {
    const { onError } = this.props

    if (onError) {
      onError(error)
    }
  }

  /**
   * Build Google DirectionsRenderer
   *
   * @returns {React.Element|null}
   */
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

Directions.propTypes = propTypes

export default Directions

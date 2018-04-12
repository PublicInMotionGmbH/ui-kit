import React from 'react'
import PropTypes from 'prop-types'
import { DirectionsRenderer } from 'react-google-maps'
import _ from 'lodash'

import getRoute from '../utils/getRoute'

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
   */
  componentWillReceiveProps (nextProps) {
    const { startPoint, endPoint } = this.props

    // When any point has changed, load directions again
    if (!_.isEqual(startPoint, nextProps.startPoint) || !_.isEqual(endPoint, nextProps.endPoint)) {
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

    getRoute(nextProps.startPoint, nextProps.endPoint).then(
      this.handleRoute.bind(this, nextProps.startPoint, nextProps.endPoint),
      this.handleError
    )
  }

  /**
   * Handle found route
   *
   * @param {object|{ lat: number, lng: number }} startPoint
   * @param {object|{ lat: number, lng: number }} endPoint
   * @param {*} directions
   */
  handleRoute (startPoint, endPoint, directions) {
    // Ignore route for old directions, otherwise we've got race condition
    if (!_.isEqual(startPoint, this.props.startPoint) || !_.isEqual(endPoint, this.props.endPoint)) {
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
  startPoint: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,

  /** End point */
  endPoint: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired
}

export default Directions

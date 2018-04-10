import React from 'react'
import PropTypes from 'prop-types'
import { DirectionsRenderer } from 'react-google-maps'
import _ from 'lodash'

/**
 * Component which represents Directions.
 *
 * @param {object} props
 * @param {object} [props.directions]
 * @returns {React.Element}
 */
class Directions extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      directions: null
    }
  }

  handleDirections (nextProps) {
    if ((nextProps.startPoint || nextProps.endPoint) == null) { return }
    const google = window.google
    const DirectionsService = new google.maps.DirectionsService()
    DirectionsService.route({
      origin: new google.maps.LatLng(nextProps.startPoint.lat, nextProps.startPoint.lng),
      destination: new google.maps.LatLng(nextProps.endPoint.lat, nextProps.endPoint.lng),
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

  componentDidMount () {
    this.handleDirections(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEqual(this.props.startPoint, nextProps.startPoint) || !_.isEqual(this.props.endPoint, nextProps.endPoint)) this.handleDirections(nextProps)
  }

  render () {
    const {directions} = this.state
    if (!directions) return null
    return (
      <DirectionsRenderer directions={directions} />
    )
  }
}

Directions.propTypes = {
  /** Object with start & end point */
  directions: PropTypes.object
}

export default Directions

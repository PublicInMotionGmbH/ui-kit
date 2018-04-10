import React from 'react'
import PropTypes from 'prop-types'
import { DirectionsRenderer } from 'react-google-maps'

/**
 * Component which represents Directions.
 *
 * @param {object} props
 * @param {object} [props.directions]
 * @returns {React.Element}
 */
export class Directions extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      directions: null
    }
  }

  handleDirections () {
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

  componentDidMount () {
    this.handleDirections()
  }

  componentWillReceiveProps () {
    this.handleDirections()
  }

  render () {
    return (
      <div>
        {this.state.directions && <DirectionsRenderer directions={this.state.directions} /> }
      </div>
    )
  }
}

Directions.propTypes = {
  /** Object with start & end point */
  directions: PropTypes.object
}

export default Directions

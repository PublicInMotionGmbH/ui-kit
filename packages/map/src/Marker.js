import React from 'react'
import PropTypes from 'prop-types'
import { Marker as GoogleMarker, InfoWindow } from 'react-google-maps'

import { Location } from './PropTypes'

const propTypes = {
  /** Marker position */
  position: Location.isRequired,

  /** Marker information window */
  info: PropTypes.node,

  /** Action on click on marker */
  onClick: PropTypes.func,

  /** Action on closing info window through X button */
  onClose: PropTypes.func,

  /** Is information window opened? */
  open: PropTypes.bool
}

/**
 * Component which represents Marker on map.
 *
 * @property {object} props
 * @property {object|{ lat: number, lng: number}} props.position
 * @property {*} [props.info]
 * @property {boolean} [props.open]
 * @property {function} [props.onClick]
 * @property {function} [props.onClose]
 *
 * @property {object} state
 * @property {boolean} state.open
 *
 * @class
 */
class Marker extends React.PureComponent {
  state = {
    open: this.props.open || false
  }

  /**
   * Handle change between controlled and not controlled component
   *
   * @param {object} props
   * @param {object|{ lat: number, lng: number}} props.position
   * @param {*} [props.info]
   * @param {boolean} [props.open]
   * @param {function} [props.onClick]
   * @param {function} [props.onClose]
   * @param {object} state
   *
   * @returns {object || null}
   */
  static getDerivedStateFromProps (props, state) {
    let nextOpen = null

    // When component is switching to controlled, we keep current open status
    if (state.open != null && props.open == null) {
      nextOpen = state.open
    }

    // When component doesn't have info window, do not open it anytime
    if (props.info == null) {
      nextOpen = false
    }

    // When opening status has changed, update it
    if (nextOpen !== null && nextOpen !== state.open) {
      return { open: nextOpen }
    }
    return null
  }

  /**
   * Is component controlled? (otherwise, it's pure)
   *
   * @returns {boolean}
   */
  isControlled () {
    return this.props.open == null && this.props.info != null
  }

  /**
   * Handle click on marker
   *
   * @param {*} event
   */
  onClick = (event) => {
    const { onClick } = this.props

    // Toggle info window
    this.toggle()

    // Fire external `onClick` event
    if (onClick) {
      onClick(event)
    }
  }

  /**
   * Toggle opening status when component is controlled
   */
  toggle () {
    if (this.isControlled()) {
      this.setState({ open: !this.state.open })
    }
  }

  /**
   * Handle event on closing info window
   */
  onClose = () => {
    const { onClose } = this.props

    // Close info window
    this.toggle()

    // Fire external `onClose` event
    if (onClose) {
      onClose()
    }
  }

  /**
   * Render marker
   *
   * @returns {React.Element}
   */
  render () {
    const { position, info, open } = this.props

    // Check if info window is opened
    const isOpen = this.isControlled() ? this.state.open : info && open

    // Build info window
    const infoWindow = isOpen ? (
      <InfoWindow onCloseClick={this.onClose}>
        <div>{info}</div>
      </InfoWindow>
    ) : null

    // Render marker
    return (
      <GoogleMarker position={position} onClick={this.onClick}>
        {infoWindow}
      </GoogleMarker>
    )
  }
}

Marker.displayName = 'Marker'

Marker.propTypes = propTypes

export default Marker

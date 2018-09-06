import React from 'react'
import PropTypes from 'prop-types'

import detector from './detector'

const propTypes = {
  /** Default view to render before device type is detected */
  defaultView: PropTypes.oneOf([ 'mobile', 'desktop' ]),

  /** Mobile view to render */
  renderMobile: PropTypes.func,

  /** Desktop view to render */
  renderDesktop: PropTypes.func
}

const defaultProps = {
  defaultView: 'desktop'
}

function getCurrentView (props) {
  return detector.isDetermined() ? detector.getViewType() : props.defaultView
}

/**
 * Component which represents Mobile Swap.
 *
 * @property {object} props
 * @property {string} [props.className]
 *
 * @property {object} state
 * @property {string} [state.view]
 *
 * @property {function} [removeListener]
 *
 * @class
 */
class DeviceSwap extends React.Component {
  state = {
    view: getCurrentView(this.props),
    defaultView: this.props.defaultView
  }

  /**
   * Update view to new default, when device type is not determined yet.
   *
   * @param {object} props
   * @param {object} state
   *
   * @returns {object || null}
   */
  static getDerivedStateFromProps (props, state) {
    if (!detector.isDetermined() && props.defaultView !== state.defaultView) {
      return {view: props.defaultView}
    } else return null
  }

  /**
   * Make sure that we have correct view type detected.
   */
  componentDidMount () {
    // Get current view type
    const detectedView = getCurrentView(this.props)

    // Update view type when it's already determined
    if (detectedView !== this.state.view) {
      this.setState({
        view: detectedView
      })
    }

    // Add listener for detector, to make sure that we use proper view type
    this.removeListener = detector.addListener(this.updateCurrentViewType)
  }

  /**
   * Remove detector listener when it's no longer needed.
   */
  componentWillUnmount () {
    if (this.removeListener) {
      this.removeListener()
      this.removeListener = null
    }
  }

  /**
   * Update current view type inside of component.
   *
   * @param {string} [viewType]
   */
  updateCurrentViewType = (viewType) => {
    const nextViewType = viewType || this.props.defaultView

    if (nextViewType !== this.state.view) {
      this.setState({
        view: nextViewType
      })
    }
  }

  /**
   * Render proper component.
   *
   * @returns {React.Element|*}
   */
  render () {
    const { defaultView, renderMobile, renderDesktop, ...passedProps } = this.props

    if (this.state.view === 'desktop') {
      return renderDesktop(passedProps)
    }

    return renderMobile(passedProps)
  }
}

DeviceSwap.displayName = 'DeviceSwap'

DeviceSwap.propTypes = propTypes
DeviceSwap.defaultProps = defaultProps

export default DeviceSwap

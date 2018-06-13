import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import throttle from 'lodash.throttle'

import createInstantiableElement from 'react-instantiable-stateless'

const propTypes = {
  /** Spied element. */
  children: PropTypes.node.isRequired,

  /** Event triggered when element becomes visible. */
  onVisible: PropTypes.func,

  /** Event triggered when elements appears on the bottom of the viewport. */
  onBeginningAppeared: PropTypes.func,

  /** Event triggered when element is fully visible on the bottom of the viewport. */
  onBeginningVisible: PropTypes.func,

  /** Event triggered when element reaches top of the viewport. */
  onEndReached: PropTypes.func,

  /** Event triggered when element disappears on the top of the viewport. */
  onEndLost: PropTypes.func,

  /** Event triggered when elements appears on the top of the viewport. */
  onEndAppeared: PropTypes.func,

  /** Event triggered when element is fully visible on the top of the viewport. */
  onEndVisible: PropTypes.func,

  /** Event triggered when element reaches bottom of the viewport. */
  onBeginningReached: PropTypes.func,

  /** Event triggered when element disappears on the bottom of the viewport. */
  onBeginningLost: PropTypes.func
}

const defaultProps = {}

/**
 * Compose handlers to create single handler which fire all of them.
 *
 * @param {...function} handlers
 * @returns {function}
 */
function composeHandlers (...handlers) {
  handlers = handlers.filter(handler => typeof handler === 'function')

  return (...args) => handlers.forEach(handler => handler(...args))
}

/**
 * Component which represents Spy Scroll.
 *
 * @property {object} props
 * @property {node} [props.children]
 * @property {function} [props.onVisible]
 * @property {function} [props.onBeginningAppeared]
 * @property {function} [props.onBeginningVisible]
 * @property {function} [props.onEndReached]
 * @property {function} [props.onEndLost]
 * @property {function} [props.onEndAppeared]
 * @property {function} [props.onEndVisible]
 * @property {function} [props.onBeginningReached]
 * @property {function} [props.onBeginningLost]
 *
 * @property {object} state
 * @property {null|boolean} state.over
 * @property {null|boolean} state.top
 * @property {null|boolean} state.bottom
 * @property {null|boolean} state.under
 * @property {null|boolean} state.visible
 *
 * @class
 */
class SpyScroll extends React.PureComponent {
  state = {
    over: null,
    top: null,
    bottom: null,
    under: null,
    visible: null
  }

  /**
   * Add event listener when component is mount.
   */
  componentDidMount () {
    if (typeof window === 'undefined') {
      return false
    }
    this.updatePosition()
    this.getSpyContainer().addEventListener('scroll', this.handleScroll, false)
  }

  /**
   * Remove event listener when component is unmount.
   */
  componentWillUnmount () {
    if (typeof window === 'undefined') {
      return false
    }

    this.getSpyContainer().removeEventListener('scroll', this.handleScroll, false)
  }

  /**
   * Trigger events when state changes.
   */
  componentDidUpdate (prevProps, prevState) {
    const { onVisible, onBeginningAppeared, onBeginningVisible,
      onEndReached, onEndLost, onEndAppeared, onEndVisible,
      onBeginningReached, onBeginningLost } = this.props

    // Trigger onVisible
    if (onVisible && prevState.visible != null && prevState.visible !== this.state.visible && this.state.visible) {
      onVisible()
    }

    if (prevState.bottom != null && prevState.bottom !== this.state.bottom) {
      // Trigger onBeginningVisible
      if (onBeginningVisible && !this.state.bottom) {
        onBeginningVisible()
      }
      // Trigger onBeginningReached
      if (onBeginningReached && this.state.bottom) {
        onBeginningReached()
      }
    }

    if (prevState.top != null && prevState.top !== this.state.top) {
      // Trigger onEndReached
      if (onEndReached && this.state.top) {
        onEndReached()
      }
      // Trigger onEndVisible
      if (onEndVisible && !this.state.top) {
        onEndVisible()
      }
    }

    if (prevState.over != null && prevState.over !== this.state.over) {
      // Trigger onEndLost
      if (onEndLost && this.state.over) {
        onEndLost()
      }
      // Trigger onEndAppeared
      if (onEndAppeared && !this.state.over) {
        onEndAppeared()
      }
    }

    if (prevState.under != null && prevState.under !== this.state.under) {
      // Trigger onBeginningAppeared
      if (onBeginningAppeared && !this.state.under) {
        onBeginningAppeared()
      }
      // Trigger onBeginningLost
      if (onBeginningLost && this.state.under) {
        onBeginningLost()
      }
    }
  }

  /**
   * Update position of element.
   */
  updatePosition = () => {
    const { offset = 0 } = this.props
    const rect = this._element.getBoundingClientRect()

    const elementHeight = rect.height
    const elementTop = rect.top - offset
    const elementBottom = rect.bottom - offset

    const { innerHeight } = this.getSpyContainer()

    const over = elementBottom < 0
    const top = elementTop < 0
    const bottom = elementBottom > innerHeight
    const under = elementTop > innerHeight
    const inside = !top && !bottom
    const halfView = !(elementBottom < innerHeight / 2) && !(elementTop > innerHeight / 2)

    // If element is taller or equal to half of the viewport
    // it is visible if it takes half of the available viewport,
    // otherwise - if it is inside of the viewport.
    const visible = elementHeight >= (innerHeight / 2)
      ? halfView
      : inside

    this.setState({ over, top, bottom, under, visible })
  }

  /**
   * Get the spy container.
   */
  getSpyContainer = () => {
    const { container } = this.props

    // Check if container is a node.
    if (container && container.nodeType) {
      return container
    }

    return window
  }

  /**
   * Handle scroll.
   */
  handleScroll = throttle(() => {
    this.updatePosition()
  }, 16)

  /**
   * Set element node.
   * @param {*} node
   */
  setRef = (node) => {
    this._element = findDOMNode(node)
  }

  /**
  * @returns {React.Element}
  */
  render () {
    const { children } = this.props

    const child = React.Children.only(children)

    const element = React.cloneElement(createInstantiableElement(child), {
      ref: child.ref ? composeHandlers(this.setRef, child.ref) : this.setRef
    })

    return element
  }
}

SpyScroll.propTypes = propTypes
SpyScroll.defaultProps = defaultProps

export default SpyScroll

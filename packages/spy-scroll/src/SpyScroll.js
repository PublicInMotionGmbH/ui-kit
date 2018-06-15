import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import throttle from 'lodash.throttle'

import createInstantiableElement from 'react-instantiable-stateless'

const propTypes = {
  /** Spied element. */
  children: PropTypes.node.isRequired,

  /** Id of spied container. */
  containerId: PropTypes.string,

  /** Event triggered when element becomes visible. */
  onVisible: PropTypes.func,

  /** Event triggered when element begins disappearing. */
  onDisappearing: PropTypes.func,

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
  onBeginningLost: PropTypes.func,

  /** Event triggered when element reaches trigger. */
  onTriggerReached: PropTypes.func,

  /** Event triggered when element retreats over the trigger. */
  onTriggerRetreats: PropTypes.func,

  /** Id of the trigger element */
  triggerId: PropTypes.string
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
 * @property {string} [props.containerId]
 * @property {function} [props.onVisible]
 * @property {function} [props.onDisappearing]
 * @property {function} [props.onBeginningAppeared]
 * @property {function} [props.onBeginningVisible]
 * @property {function} [props.onEndReached]
 * @property {function} [props.onEndLost]
 * @property {function} [props.onEndAppeared]
 * @property {function} [props.onEndVisible]
 * @property {function} [props.onBeginningReached]
 * @property {function} [props.onBeginningLost]
 * @property {function} [props.onTriggerReached]
 * @property {function} [props.onTriggerRetreats]
 * @property {string} [props.triggerId]
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
    visible: null,
    triggered: null
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
    const { onVisible, onDisappearing, onBeginningAppeared, onBeginningVisible,
      onEndReached, onEndLost, onEndAppeared, onEndVisible, onBeginningReached,
      onBeginningLost, onTriggerReached, onTriggerRetreats } = this.props

    if (prevState.visible != null && prevState.visible !== this.state.visible) {
      // Trigger onDisappearing
      if (onDisappearing && !this.state.visible) {
        onDisappearing()
      }
      // Trigger onVisible
      if (onVisible && this.state.visible) {
        onVisible()
      }
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

    if (prevState.triggered != null && prevState.triggered !== this.state.triggered) {
      // Trigger onTriggerReached
      if (onTriggerReached && !this.state.triggered) {
        onTriggerReached()
      }
      // Trigger onTriggerRetreats
      if (onTriggerRetreats && this.state.triggered) {
        onTriggerRetreats()
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

    const container = this.getSpyContainer()
    const trigger = this.getTrigger()

    const containerHeight = container === window
      ? container.innerHeight
      : container.getBoundingClientRect().height + container.getBoundingClientRect().top

    const containerTop = container === window
      ? 0
      : container.getBoundingClientRect().top

    const triggerPoint = trigger && trigger.getBoundingClientRect().top

    const over = elementBottom < containerTop
    const top = elementTop < containerTop
    const bottom = elementBottom > containerHeight
    const under = elementTop > containerHeight
    const inside = !top && !bottom
    const halfView = !(elementBottom < containerHeight / 2) && !(elementTop > containerHeight / 2)

    // If element is taller or equal to half of the viewport
    // it is visible if it takes half of the available viewport,
    // otherwise - if it is inside of the viewport.
    const visible = elementHeight >= (containerHeight / 2)
      ? halfView
      : inside

    const triggered = trigger && elementTop > triggerPoint

    this.setState({ over, top, bottom, under, visible, triggered })
  }

  /**
   * Get the spy container.
   */
  getSpyContainer = () => {
    const { containerId } = this.props

    const container = document.getElementById(containerId)
    // Check if container is a node.
    if (container && container.nodeType) {
      return container
    }

    return window
  }

  /**
   * Get the trigger.
   */
  getTrigger = () => {
    const { triggerId } = this.props

    const trigger = document.getElementById(triggerId)
    // Check if trigger is a node.
    if (trigger && trigger.nodeType) {
      return trigger
    }

    return null
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

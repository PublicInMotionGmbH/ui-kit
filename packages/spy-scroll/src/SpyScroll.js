import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import throttle from 'lodash.throttle'
import createInstantiableElement from 'react-instantiable-stateless'

import { getContainerRect, getElementRect, getTriggerPoint, getRangePoints } from '../utils/helpers'

const propTypes = {
  /** Spied element. */
  children: PropTypes.node.isRequired,

  /** Id of spied container. */
  containerId: PropTypes.string,

  /** Switch scroll spy to horizontal. */
  horizontal: PropTypes.bool,

  /** Event triggered when element becomes visible. */
  onVisible: PropTypes.func,

  /** Event triggered when element begins disappearing. */
  onDisappearing: PropTypes.func,

  /** Event triggered when elements appears on the beginning of the viewport. */
  onBeginningAppeared: PropTypes.func,

  /** Event triggered when element is fully visible on the beginning of the viewport. */
  onBeginningVisible: PropTypes.func,

  /** Event triggered when element reaches end of the viewport. */
  onEndReached: PropTypes.func,

  /** Event triggered when element disappears on the end of the viewport. */
  onEndLost: PropTypes.func,

  /** Event triggered when elements appears on the end of the viewport. */
  onEndAppeared: PropTypes.func,

  /** Event triggered when element is fully visible on the end of the viewport. */
  onEndVisible: PropTypes.func,

  /** Event triggered when element reaches beginning of the viewport. */
  onBeginningReached: PropTypes.func,

  /** Event triggered when element disappears on the beginning of the viewport. */
  onBeginningLost: PropTypes.func,

  /** Event triggered when element reaches trigger. */
  onTriggerReached: PropTypes.func,

  /** Event triggered when element retreats ahead the trigger. */
  onTriggerRetreats: PropTypes.func,

  /** Event triggered when element enters range. */
  onRangeEntered: PropTypes.func,

  /** Event triggered when element leaves range. */
  onRangeLeft: PropTypes.func,

  /** Scroll offset for triggers. */
  offset: PropTypes.number,

  /** Array of range elements' id's. */
  range: PropTypes.arrayOf(PropTypes.string),

  /** Id of the trigger element. */
  triggerId: PropTypes.string
}

const defaultProps = {
  horizontal: false,
  offset: 0,
  range: []
}

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
* Trigger event on state change.
*
* @param {boolean|null} prevState
* @param {boolean|null} state
* @param {function} trueStateEvent
* @param {function} falseStateEvent
* @returns {function}
*/
function trigger (prevState, state, trueStateEvent, falseStateEvent) {
  if (prevState === null || prevState === state) return

  if (trueStateEvent && state) {
    trueStateEvent()
  } else if (falseStateEvent && !state) {
    falseStateEvent()
  }
}

/**
 * Component which represents Spy Scroll.
 *
 * @property {object} props
 * @property {node} [props.children]
 * @property {string} [props.containerId]
 * @property {boolean} [props.horizontal]
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
 * @property {function} [props.onRangeEntered]
 * @property {function} [props.onRangeLeft]
 * @property {number} [props.offset]
 * @property {array} [props.range]
 * @property {string} [props.triggerId]
 *
 * @property {object} state
 * @property {null|boolean} state.ahead
 * @property {null|boolean} state.end
 * @property {null|boolean} state.beginning
 * @property {null|boolean} state.behind
 * @property {null|boolean} state.visible
 * @property {null|boolean} state.triggered
 *
 * @class
 */
class SpyScroll extends React.PureComponent {
  constructor () {
    super()
    this.state = {
      ahead: null,
      end: null,
      beginning: null,
      behind: null,
      inRange: null,
      triggered: null,
      visible: null
    }
    this.updatePosition = this.updatePosition.bind(this)
    this.getSpyContainer = this.getSpyContainer.bind(this)
    this.getTrigger = this.getTrigger.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.getRange = this.getRange.bind(this)

    this._handleScroll = throttle(this.handleScroll, 16)
  }

  /**
   * Add event listener when component is mount.
   */
  componentDidMount () {
    if (typeof window === 'undefined') { return false }

    this._container = this.getSpyContainer()
    this._trigger = this.getTrigger()
    this._rangeStart = this.getRange(this.props.range, 0)
    this._rangeEnd = this.getRange(this.props.range, 1)

    this.updatePosition()
    this._container.addEventListener('scroll', this._handleScroll, false)
  }

  /**
   * Remove event listener when component is unmount.
   */
  componentWillUnmount () {
    if (typeof window === 'undefined') { return false }

    this._container.removeEventListener('scroll', this._handleScroll, false)
  }

  /**
   * Trigger events when state changes.
   */
  componentDidUpdate (prevProps, prevState) {
    const { onVisible, onDisappearing, onBeginningAppeared, onBeginningVisible, onEndReached,
      onEndLost, onEndAppeared, onEndVisible, onBeginningReached, onBeginningLost,
      onTriggerReached, onTriggerRetreats, onRangeEntered, onRangeLeft } = this.props

    // Trigger onVisible or onDisappearing for state.visible change
    trigger(prevState.visible, this.state.visible, onVisible, onDisappearing)

    // Trigger onBeginningReached or onBeginningVisible for state.beginning change
    trigger(prevState.beginning, this.state.beginning, onBeginningReached, onBeginningVisible)

    // Trigger onEndReached or onEndVisible for state.end change
    trigger(prevState.end, this.state.end, onEndReached, onEndVisible)

    // Trigger onEndLost or onEndAppeared for state.ahead change
    trigger(prevState.ahead, this.state.ahead, onEndLost, onEndAppeared)

    // Trigger onBeginningLost or onBeginningAppeared for state.behind change
    trigger(prevState.behind, this.state.behind, onBeginningLost, onBeginningAppeared)

    // Trigger onTriggerRetreats or onTriggerReached for state.triggered change
    trigger(prevState.triggered, this.state.triggered, onTriggerReached, onTriggerRetreats)

    // Trigger onRangeLeft or onRangeEntered for state.inRange change
    trigger(prevState.inRange, this.state.inRange, onRangeEntered, onRangeLeft)
  }

  /**
   * Update position of element.
   */
  updatePosition () {
    const { horizontal, offset } = this.props

    const { containerBeginning, containerLength } = getContainerRect(this._container, horizontal)
    const { elementBeginning, elementEnd, elementLength } = getElementRect(this._element, offset, horizontal)
    const triggerPoint = getTriggerPoint(this._trigger, horizontal)
    const { rangeStart, rangeEnd } = getRangePoints(this._rangeStart, this._rangeEnd, horizontal)

    const ahead = elementEnd < containerBeginning
    const end = elementBeginning < containerBeginning
    const beginning = elementEnd > containerLength
    const behind = elementBeginning > containerLength
    const inside = !end && !beginning
    const halfView = !(elementEnd < containerLength / 2) && !(elementBeginning > containerLength / 2)
    const visible = elementLength >= (containerLength / 2) ? halfView : inside
    const triggered = this._trigger && elementBeginning < triggerPoint
    const inRange = elementBeginning >= rangeStart && elementEnd <= rangeEnd

    this.setState({ ahead, end, beginning, behind, inRange, triggered, visible })
  }

  /**
   * Get the spy container.
   */
  getSpyContainer () {
    const { containerId } = this.props

    const container = document.getElementById(containerId)

    // Check if container is a node.
    if (container && container.nodeType) {
      return container
    }

    return window
  }

  /**
   * Get the range point.
   * @param {array} range
   * @param {number} index
   *
   * @returns {node|null}
   */
  getRange (range, index) {
    const point = document.getElementById(range[index])

    // Check if range point is a node.
    if (range.length !== 2 || point == null || !point.nodeType) {
      return null
    }

    return point
  }

  /**
   * Get the trigger.
   */
  getTrigger () {
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
  handleScroll () {
    this.updatePosition()
  }

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

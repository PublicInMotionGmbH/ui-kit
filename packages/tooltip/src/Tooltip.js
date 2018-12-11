import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import throttle from 'lodash/throttle'
import isUndefined from 'lodash/isUndefined'

import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { buildClassName } from '@talixo/shared'
import { Portal } from '@talixo/portal'

import { getPositionNearElement } from './utils/position'
import createInstantiableElement from 'react-instantiable-stateless'

const moduleName = 'tooltip'

const propTypes = {
  /** Tooltipped elements */
  children: PropTypes.node,

  /** Additional class name passed to the tooltip */
  className: PropTypes.string,

  /** Fade in / out animation */
  fade: PropTypes.bool,

  /** Fade time */
  fadeTime: PropTypes.number,

  /** Controls whether tooltip is open */
  open: PropTypes.bool,

  /** Tooltip position */
  position: PropTypes.oneOf([ 'left', 'right', 'top', 'bottom' ]),

  /** By default tooltip will go to different place, when there is not enough space - you can lock position by this property */
  lockPosition: PropTypes.bool,

  /** Renders tooltip content */
  render: PropTypes.func.isRequired,

  /** Root element of tooltip portal */
  attachTo: PropTypes.string,

  /** Additional styles passed to the tooltip */
  style: PropTypes.object,

  /** Show arrow next to tooltip */
  arrow: PropTypes.bool,

  /** Type of event to open tooltip  */
  triggerOn: PropTypes.oneOf([ 'hover', 'click' ])
}

const defaultProps = {
  fade: false,
  position: 'top',
  arrow: true,
  lockPosition: false,
  fadeTime: 600,
  triggerOn: 'hover'
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
 * Component which represents Tooltip.
 *
 * @property {object} props
 * @property {boolean} props.fade
 * @property {string} props.position
 * @property {string} [props.attachTo]
 * @property {boolean} [props.open]
 * @property {*} [props.children]
 * @property {string} [props.className]
 * @property {number} [props.fadeTime]
 * @property {function} [props.render]
 * @property {object} [props.style]
 *
 * @property {object} state
 * @property {string} state.triggerOn
 * @property {boolean} state.clicked
 * @property {boolean} state.open
 * @property {null|number} state.top
 * @property {null|number} state.left
 *
 * @property {Element} [el]
 * @class
 */
class Tooltip extends React.Component {
  state = {
    triggerOn: this.props.triggerOn,
    clicked: false,
    open: this.props.open,
    left: null,
    top: null
  }

  /**
   * Add event listener when component is mount
   */
  componentDidMount () {
    this.updatePosition()
    window.addEventListener('resize', this.updatePosition)
    window.addEventListener('scroll', this.updatePosition)
    this.addListeners(this.el)
  }

  /**
   * Remove event listener when component is unmount
   */
  componentWillUnmount () {
    window.removeEventListener('resize', this.updatePosition)
    window.removeEventListener('scroll', this.updatePosition)
    this.removeListeners(this.el)
  }

  /**
   * Update position and state.open when props has changed
   * @param {*} nextProps
   */
  componentWillReceiveProps (nextProps) {
    if (this.props.position !== nextProps.position) this.updatePosition(nextProps)
    if (this.props.open !== nextProps.open) this.setState({ open: nextProps.open })
    this.addListeners()
  }

  /**
   * Update position of tooltip
   * @param {*} nextProps
   */
  updatePosition = throttle((nextProps) => {
    if (!this.el) return

    const { lockPosition } = this.props

    const el = this.el
    const position = (nextProps && nextProps.position) || this.props.position
    const tooltip = this.tooltip
    const rect = tooltip && tooltip.getBoundingClientRect()

    const nextState = rect
      ? getPositionNearElement(el, position, rect.width + 15, rect.height + 15, lockPosition)
      : getPositionNearElement(el, position, null, null, lockPosition)

    if (nextState.position !== this.state.position || nextState.top !== this.state.top || nextState.left !== this.state.left) {
      this.setState(nextState)
    }
  }, 20)

  /**
   * Handle mouse enter event
   */
  handleMouseEnter = () => {
    if (!isUndefined(this.props.open)) return
    this.setState({ clicked: false, open: true })
    this.updatePosition()
  }

  /**
   * Handle mouse leave
   */
  handleMouseLeave = () => {
    if (!isUndefined(this.props.open)) return
    this.setState({ open: false })
    this.updatePosition()
  }

  /**
   * Handle mouse over
   */
  handleMouseOver = () => {
    if (!isUndefined(this.props.open)) return
    if (!this.state.clicked && !this.state.open) this.setState({ open: true })
    this.updatePosition()
  }

  /**
   * Handle mouse click
   */
  handleMouseClick = () => {
    if (!isUndefined(this.props.open)) return
    this.setState({ open: !this.state.open })
    this.updatePosition()
  }

  setRef = (node) => {
    this.removeListeners(this.el)
    this.el = findDOMNode(node)
    this.addListeners(this.el)
  }

  setTooltipRef = (node) => {
    this.tooltip = findDOMNode(node)
  }

  addListeners = (element) => {
    if (!element) {
      return
    }

    if (this.props.triggerOn === 'click') {
      element.addEventListener('click', this.handleMouseClick)
    }

    if (this.props.triggerOn === 'hover') {
      element.addEventListener('mouseleave', this.handleMouseLeave)
      element.addEventListener('mouseenter', this.handleMouseEnter)
      element.addEventListener('mouseover', this.handleMouseOver)
    }
  }

  removeListeners = (element) => {
    if (!element) {
      return
    }

    element.removeEventListener('click', this.handleMouseClick)
    element.removeEventListener('mouseleave', this.handleMouseLeave)
    element.removeEventListener('mouseenter', this.handleMouseEnter)
    element.removeEventListener('mouseover', this.handleMouseOver)
  }

  componentDidUpdate () {
    this.updatePosition()
  }

  /**
  * @returns {React.Element}
  */
  render () {
    const { children, className, fade, fadeTime, render, attachTo, style, arrow } = this.props
    const { position, top, left } = this.state

    const transition = fade ? { transition: `opacity ${fadeTime}ms` } : null

    const element = React.Children.only(children)

    const innerElement = React.cloneElement(createInstantiableElement(element), {
      ref: element.ref ? composeHandlers(this.setRef, element.ref) : this.setRef
    })

    const fadeClasses = buildClassName([ moduleName, 'fade' ])
    const nameClasses = buildClassName(moduleName, className, [ position ], { arrow })

    const tooltipStyle = {
      top: top,
      left: left,
      ...transition,
      ...style
    }

    return <React.Fragment>
      {innerElement}
      <Portal attachTo={attachTo}>
        <TransitionGroup>
          {this.state.open ? (
            <CSSTransition timeout={fade ? fadeTime : 0} classNames={fadeClasses}>
              <span ref={this.setTooltipRef} className={nameClasses} style={tooltipStyle}>
                {render(this.state)}
              </span>
            </CSSTransition>
          ) : null}
        </TransitionGroup>
      </Portal>
    </React.Fragment>
  }
}

Tooltip.displayName = 'Tooltip'

Tooltip.propTypes = propTypes
Tooltip.defaultProps = defaultProps

export default Tooltip

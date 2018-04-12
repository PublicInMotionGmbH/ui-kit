import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { buildClassName, prefix } from '@talixo/shared'
import { Portal } from '@talixo/portal'

import { getPositionNearElement } from '../utils/position'

const moduleName = prefix('tooltip')

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
 * @property {string} [props.color]
 * @property {number} [props.fadeTime]
 * @property {function} [props.render]
 * @property {object} [props.style]
 *
 * @property {object} state
 * @property {boolean} state.clicked
 * @property {boolean} state.open
 * @property {null|number} state.top
 * @property {null|number} state.left
 *
 * @property {Element} [el]
 */
class Tooltip extends React.Component {
  /**
   * @param {object} props
   * @param {boolean} props.fade
   * @param {string} props.position
   * @param {string} [props.attachTo]
   * @param {boolean} [props.open]
   * @param {*} [props.children]
   * @param {string} [props.className]
   * @param {string} [props.color]
   * @param {number} [props.fadeTime]
   * @param {function} [props.render]
   * @param {object} [props.style]
   */
  constructor (props) {
    super(props)

    this.state = {
      clicked: false,
      open: this.props.open,
      left: null,
      top: null
    }

    this.updatePosition = _.throttle(this.updatePosition, 10)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseClick = this.handleMouseClick.bind(this)
    this.setRef = this.setRef.bind(this)
  }

  componentDidMount () {
    this.updatePosition()
    window.addEventListener('resize', this.updatePosition)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updatePosition)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.position !== nextProps.position) this.updatePosition(nextProps)
    if (this.props.open !== nextProps.open) this.setState({ open: nextProps.open })
  }

  updatePosition (nextProps) {
    const { top, left } = getPositionNearElement(this.el, (nextProps && nextProps.position) || this.props.position)
    this.setState({ top, left })
  }

  handleMouseEnter () {
    if (!_.isUndefined(this.props.open)) return
    this.setState({ clicked: false, open: true })
  }

  handleMouseLeave () {
    if (!_.isUndefined(this.props.open)) return
    this.setState({ open: false })
  }

  handleMouseOver () {
    if (!_.isUndefined(this.props.open)) return
    if (!this.state.clicked && !this.state.open) this.setState({ open: true })
  }

  handleMouseClick () {
    if (!_.isUndefined(this.props.open)) return
    this.setState({ clicked: true, open: false })
  }

  setRef (node, child) {
    this.el = node
  }

  /**
  * @returns {React.Element}
  */
  render () {
    const {
      children, className, color, fade, fadeTime,
      position, render, attachTo, style
    } = this.props

    const defaultFadeTime = 600
    const transition = fade ? { transition: `opacity ${fadeTime || defaultFadeTime}ms` } : null

    const childWithRef = React.Children.only(children)
      ? React.Children.map(children, child =>
        React.cloneElement(child, {
          ref: node => this.setRef(node, child)
        }))
      : null

    const clsName = buildClassName('tooltip', className, [ color, position ])

    const tooltipStyle = {
      top: this.state.top,
      left: this.state.left,
      ...transition,
      ...style
    }

    return (
      <div
        className={`${moduleName}-hover`}
        onClick={this.handleMouseClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseOver={this.handleMouseOver}
      >
        {childWithRef}
        <TransitionGroup>
          {this.state.open ? (
            <CSSTransition timeout={fade ? fadeTime || defaultFadeTime : 0} classNames={`${moduleName}-fade`}>
              <Portal attachTo={attachTo}>
                <span className={clsName} style={tooltipStyle}>
                  {render(this.state)}
                </span>
              </Portal>
            </CSSTransition>
          ) : null}
        </TransitionGroup>
      </div>
    )
  }
}

Tooltip.propTypes = {
  /** Tooltipped elements */
  children: PropTypes.node,

  /** Additional class name passed to the tooltip */
  className: PropTypes.string,

  /** Color of the tooltip */
  color: PropTypes.string,

  /** Fade in / out animation */
  fade: PropTypes.bool,

  /** Fade time */
  fadeTime: PropTypes.number,

  /** Controls whether tooltip is open */
  open: PropTypes.bool,

  /** Tooltip position */
  position: PropTypes.oneOf([ 'left', 'right', 'top', 'bottom' ]),

  /** Renders tooltip content */
  render: PropTypes.func.isRequired,

  /** Root element of tooltip portal */
  attachTo: PropTypes.string,

  /** Additional styles passed to the tooltip */
  style: PropTypes.object
}

Tooltip.defaultProps = {
  fade: false,
  position: 'right'
}

export default Tooltip

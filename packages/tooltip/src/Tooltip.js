import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
import cls from 'classnames'

import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { getPositionNearElement } from '../utils/position'
import { buildClassName, prefix } from '@talixo/shared'

const moduleName = prefix('tooltip')

class Portal extends React.Component {
  constructor (props) {
    super(props)
    this.root = this.props.root || document.querySelector('body')
    this.el = document.createElement(this.props.element || 'div')
  }

  componentDidMount () {
    this.root.appendChild(this.el)
  }

  componentDidUpdate () {
    this.root.appendChild(this.el)
  }

  componentWillUnmount () {
    this.root.removeChild(this.el)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.root !== nextProps.root) {
      this.root.removeChild(this.el)
      this.root = nextProps.root
    }
  }

  render () {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

/**
 * Component which represents Tooltip.
 *
 * @property {object} props
 * @property {boolean} props.fade
 * @property {string} props.position
 * @property {string} [props.rootNode]
 * @property {boolean} [props.isOpen]
 * @property {*} [props.children]
 * @property {string} [props.className]
 * @property {string} [props.color]
 * @property {number} [props.fadeTime]
 * @property {function} [props.render]
 * @property {object} [props.style]
 *
 * @property {object} state
 * @property {boolean} state.clicked
 * @property {boolean} state.isOpen
 * @property {null|number} state.top
 * @property {null|number} state.left
 *
 * @property {Element} [el]
 */
class Tooltip extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isPopover: this.props.isPopover,
      clicked: false,
      isOpen: this.props.isOpen,
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
    if (this.props.isOpen !== nextProps.isOpen) this.setState({ isOpen: nextProps.isOpen })
  }

  updatePosition (nextProps) {
    const { top, left } = getPositionNearElement(this.el, (nextProps && nextProps.position) || this.props.position)
    this.setState({ top, left })
  }

  handleMouseEnter () {
    if (!_.isUndefined(this.props.isOpen)) return
    this.setState({ clicked: false, isOpen: true })
    this.updatePosition()
  }

  handleMouseLeave () {
    if (!_.isUndefined(this.props.isOpen)) return
    this.setState({ isOpen: false })
    this.updatePosition()
  }

  handleMouseOver () {
    if (!_.isUndefined(this.props.isOpen)) return
    if (!this.state.clicked && !this.state.isOpen) this.setState({ isOpen: true })
    this.updatePosition()
  }

  handleMouseClick (e) {
    if (this.props.isPopover) {
      if (this.state.isOpen) {
        this.setState({ isOpen: false })
        return
      }
      this.setState({ isOpen: true })
      return
    }
    this.updatePosition()
  }

  setRef (node) {
    this.el = node
  }

  /**
  * @returns {React.Element}
  */
  render () {
    const {
      children, className, color, fade, fadeTime,
      position, render, rootNode, style, isPopover
    } = this.props

    const defaultFadeTime = 600
    const transition = fade ? { transition: `opacity ${fadeTime || defaultFadeTime}ms` } : null

    const childWithRef = React.Children.only(children)
      ? React.Children.map(children, child =>
        React.cloneElement(child, {
          ref: node => this.setRef(node)
        }))
      : null

    const clsName = cls(moduleName, className, {
      [`${moduleName}--${color}`]: color !== undefined,
      [`${moduleName}--${position}`]: position !== undefined,
      [`${moduleName}--popover`]: isPopover === true
    })

    const tooltipStyle = {
      top: this.state.top,
      left: this.state.left,
      ...transition,
      ...style
    }

    return (
      <div
        className={`${moduleName}-hover`}
        onClick={(e) => this.handleMouseClick(e)}
        onMouseEnter={this.props.isPopover ? null : this.handleMouseEnter}
        onMouseLeave={this.props.isPopover ? null : this.handleMouseLeave}
        onMouseOver={this.props.isPopover ? null : this.handleMouseOver}
      >
        {childWithRef}
        <TransitionGroup>
          {this.state.isOpen ? (
            <CSSTransition timeout={fade ? fadeTime || defaultFadeTime : 0} classNames={`${moduleName}-fade`}>
              <Portal root={rootNode}>
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
  isOpen: PropTypes.bool,

  /** Tooltip position */
  position: PropTypes.oneOf([ 'left', 'right', 'top', 'bottom' ]),

  /** Renders tooltip content */
  render: PropTypes.func.isRequired,

  /** Root element of tooltip portal */
  rootNode: PropTypes.string,

  /** Additional styles passed to the tooltip */
  style: PropTypes.object
}

Tooltip.defaultProps = {
  fade: false,
  position: 'right'
}

export default Tooltip

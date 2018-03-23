import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import cls from 'classnames'
import _ from 'lodash'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { getPositionNearElement } from '../utils/position'
import { prefix } from '@talixo/commons'

const name = prefix('tooltip')

class Portal extends React.Component {
  constructor (props) {
    super(props)
    this.el = document.createElement(this.props.element || 'div')
    this.root = this.props.root || document.querySelector('body')
  }

  componentDidMount () {
    this.root.appendChild(this.el)
  }

  componentWillUnmount () {
    this.root.removeChild(this.el)
  }

  render () {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

/**
 * Component which represents Tooltip.
 *
 * @param {object} props
 * @param {string} [props.children]
 * @param {string} [props.className]
 * @param {string} [props.color]
 * @param {string} [props.fade]
 * @param {string} [props.fadeTime]
 * @param {string} [props.isOpen]
 * @param {string} [props.style]
 * @param {string} [props.position]
 * @param {string} [props.render]
 * @returns {React.Element}
 */
class Tooltip extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      clicked: false,
      isOpen: !!this.props.isOpen,
      left: null,
      top: null
    }
    this.updatePosition = _.throttle(this.updatePosition, 10)
    this.updatePosition = this.updatePosition.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseClick = this.handleMouseClick.bind(this)
  }

  componentDidMount () {
    this.updatePosition()
    window.addEventListener('resize', this.updatePosition)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updatePosition)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.isOpen !== nextProps.isOpen) this.setState({ isOpen: nextProps.isOpen })
  }

  updatePosition () {
    const { top, left } = getPositionNearElement(this.el, this.props.position)
    this.setState({ top, left })
  }

  handleMouseEnter () {
    if (!_.isUndefined(this.props.isOpen)) return
    this.setState({ clicked: false, isOpen: true })
  }

  handleMouseLeave () {
    if (!_.isUndefined(this.props.isOpen)) return
    this.setState({ isOpen: false })
  }

  handleMouseOver () {
    if (!_.isUndefined(this.props.isOpen)) return
    if (!this.state.clicked && !this.state.isOpen) this.setState({ isOpen: true })
  }

  handleMouseClick () {
    if (!_.isUndefined(this.props.isOpen)) return
    this.setState({ clicked: true, isOpen: false })
  }

  render () {
    const {
      children,
      className,
      color,
      fade,
      fadeTime,
      position,
      render,
      rootNode,
      style
    } = this.props

    const defaultFadeTime = 600
    const transition = fade ? { transition: `opacity ${fadeTime || defaultFadeTime}ms` } : null

    return (
      <div
        className={`${name}-hover`}
        onClick={this.handleMouseClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseOver={this.handleMouseOver}
      >
        <div ref={node => (this.el = node)} style={{ display: 'inline-block' }} className={`${name}-wrapper`}>
          {children}
        </div>
        <TransitionGroup>
          {this.state.isOpen ? (
            <CSSTransition timeout={fade ? fadeTime || defaultFadeTime : 0} classNames={`${name}-fade`}>
              <Portal root={document.querySelector(rootNode)}>
                <span
                  className={cls(name, className, {
                    [`${name}--${color}`]: color !== undefined,
                    [`${name}--${position}`]: position !== undefined
                  })}
                  style={{
                    top: this.state.top,
                    left: this.state.left,
                    ...transition,
                    ...style
                  }}
                >
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
  position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']).isRequired,

  /** Renders toolyip content */
  render: PropTypes.func,

  /** Root element of tooltip portal */
  rootNode: PropTypes.string,

  /** Additional styles passed to the tooltip */
  style: PropTypes.object
}

Tooltip.defaultProps = {
  fade: false,
  rootNode: 'body'
}

export default Tooltip

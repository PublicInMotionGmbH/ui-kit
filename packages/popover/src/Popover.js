import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import cls from 'classnames'
import _ from 'lodash'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { getPositionNearElement, getTarget } from '../../../utils/position'

import { prefix } from '@talixo/shared'

const name = prefix('popover')

/**
 * Component which represents Popover.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {node} [props.children]
 * @param {string} [props.color]
 * @param {bool} [props.fade]
 * @param {number} [props.fadeTime]
 * @param {bool} [props.isOpen]
 * @param {number} [props.layer]
 * @param {string} [props.rootNode]
 * @param {oneOf(['left', 'right', 'top', 'bottom'])} [props.position]
 * @param {object} [props.style]
 * @returns {React.Element}
 */

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

class Popover extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      left: null,
      top: null
    }
    this.updatePosition = _.throttle(this.updatePosition, 10)
    this.updatePosition = this.updatePosition.bind(this)
  }

  componentDidMount () {
    this.setState({ isOpen: this.props.isOpen })
    this.target = getTarget(this.props.target)
    this.updatePosition()
    window.addEventListener('resize', this.updatePosition)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ isOpen: nextProps.isOpen })
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updatePosition)
  }

  updatePosition () {
    const { top, left } = getPositionNearElement(this.target, this.props.position)
    this.setState({ top, left })
  }

  render () {
    const { children, className, color, fade, fadeTime, layer, style, position, rootNode } = this.props
    const defaultFadeTime = 600
    const transition = fade ? { transition: `opacity ${fadeTime || defaultFadeTime}ms` } : null

    const clsName = cls(name, className, {
      [`${name}--${color}`]: color !== undefined,
      [`${name}--${position}`]: position !== undefined,
      [`Layer-${layer}`]: layer !== undefined
    })

    const styles = {
      top: this.state.top,
      left: this.state.left,
      ...transition,
      ...style
    }

    const element = (
      <span className={clsName} style={styles}>
        {children}
      </span>
    )

    const timeout = { enter: 0, exit: fade ? fadeTime || defaultFadeTime : 0 }

    return (
      <TransitionGroup>
        {this.state.isOpen ? (
          <CSSTransition timeout={timeout} classNames={`${name}-fade`}>
            <Portal root={document.querySelector(rootNode)}>
              {element}
            </Portal>
          </CSSTransition>
        ) : null }
      </TransitionGroup>
    )
  }
}

Popover.propTypes = {
  /** Children */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Color of text */
  color: PropTypes.string,

  /** Fade on or off */
  fade: PropTypes.bool,

  /** Fade time */
  fadeTime: PropTypes.number,

  /** Popover is visible */
  isOpen: PropTypes.bool,

  /** Quantity of popover layer */
  layer: PropTypes.number,

  /** Root node of popover */
  rootNode: PropTypes.string,

  /** Position of popover */
  position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']).isRequired,

  /** Style CSS */
  style: PropTypes.object
}

Popover.defaultProps = {
  fade: false,
  isOpen: false,
  rootNode: 'body',
  position: 'right'
}

export default Popover

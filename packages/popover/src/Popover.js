import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { buildClassName, prefix } from '@talixo/shared'
import { Portal } from '@talixo/portal'

import { getPositionNearElement, getTarget } from '../utils/position'

const moduleName = prefix('popover')

/**
 * Component which represents Popover.
 *
 * @property {object} props
 * @property {string} [props.attachTo]
 * @property {string} [props.className]
 * @property {*} [props.children]
 * @property {string} [props.color]
 * @property {boolean} [props.fade]
 * @property {number} [props.fadeTime]
 * @property {boolean} [props.open]
 * @property {number} [props.layer]
 * @property {string} [props.position]
 * @property {object} [props.style]
 *
 * @property {object} state
 * @property {object} [state.left]
 * @property {object} [state.top]
 * @class
 */
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
    this.setState({ open: this.props.open })
    this.target = getTarget(this.props.target)
    this.updatePosition()
    window.addEventListener('resize', this.updatePosition)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ open: nextProps.open })
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updatePosition)
  }

  updatePosition () {
    const { top, left } = getPositionNearElement(this.target, this.props.position)
    this.setState({ top, left })
  }

  render () {
    const { attachTo, children, className, color, fade, fadeTime, layer, style, position } = this.props
    const defaultFadeTime = 600
    const transition = fade ? { transition: `opacity ${fadeTime || defaultFadeTime}ms` } : null

    const clsName = buildClassName('popover', className, [ color, position ], {
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
        {this.state.open ? (
          <CSSTransition timeout={timeout} classNames={`${moduleName}-fade`}>
            <Portal attachTo={attachTo}>
              {element}
            </Portal>
          </CSSTransition>
        ) : null }
      </TransitionGroup>
    )
  }
}

Popover.propTypes = {
  /** Root node of popover */
  attachTo: PropTypes.node,

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
  open: PropTypes.bool,

  /** Quantity of popover layer */
  layer: PropTypes.number,

  /** Position of popover */
  position: PropTypes.oneOf([ 'left', 'right', 'top', 'bottom' ]),

  /** Style CSS */
  style: PropTypes.object
}

Popover.defaultProps = {
  fade: false,
  open: false,
  position: 'right'
}

export default Popover

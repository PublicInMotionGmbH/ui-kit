import React from 'react'
import PropTypes from 'prop-types'

import { findDOMNode } from 'react-dom'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional styles for collapse container. */
  style: PropTypes.object,

  /** Additional class name for collapse container. */
  className: PropTypes.string,

  /** Should it collapse smoothly? */
  smooth: PropTypes.bool,

  /** Is it collapsed? */
  collapsed: PropTypes.bool,

  /** Animation speed (in px/ms). */
  animationSpeed: PropTypes.number,

  /** Content for collapsed container. */
  children: PropTypes.node
}

const defaultProps = {
  collapsed: true,
  smooth: true,
  animationSpeed: 200
}

class Container {
  instances = []
  frame = null

  unregister (instance) {
    this.instances = this.instances.filter(x => x === instance)

    if (this.instances.length === 0) {
      window.cancelAnimationFrame(this.frame)
    }
  }

  register (instance) {
    this.instances.push(instance)

    if (this.instances.length === 1) {
      this.frame = window.requestAnimationFrame(this.tick)
    }
  }

  tick = () => {
    this.frame = window.requestAnimationFrame(this.tick)

    for (let i = 0; i < this.instances.length; i++) {
      this.instances[i].updateHeight()
    }
  }
}

const container = new Container()

/**
 * Component which represents Collapse.
 *
 * @property {object} props
 * @property {object} props.style
 * @property {string} props.className
 * @property {boolean} props.smooth
 * @property {boolean} props.collapsed
 * @property {number} props.animationSpeed
 * @property {*} props.children
 *
 * @property {number|null} height
 * @property {number|null} reflowHeight
 * @property {function|null} raf
 *
 * @property {Element|null} node
 * @property {Element|null} content
 *
 * @class
 */
class Collapse extends React.PureComponent {
  height = null
  constructor () {
    super()
    this.updateHeight = this.updateHeight.bind(this)
  }

  componentDidMount () {
    this.updateHeight()
    container.register(this)
  }

  componentDidUpdate () {
    this.updateHeight()
  }

  componentWillUnmount () {
    container.unregister(this)
  }

  updateHeight () {
    if (!this.node) {
      return
    }

    // Get desires height
    const height = !this.props.collapsed
      ? this.content.offsetHeight
      : 0

    // Update height when it is not the same
    if (this.height !== height) {
      const { smooth, animationSpeed } = this.props

      if (smooth && animationSpeed !== 0) {
        const currentHeight = this.height
        const diff = Math.abs(currentHeight - height)
        const transitionTime = diff * 1000 / animationSpeed

        // Set transition duration
        this.node.style.transitionDuration = transitionTime + 'ms'
      }

      this.height = height
      // Set height
      this.node.style.height = height + 'px'
    }
  }

  /**
   * Save base node element
   *
   * @param {Element} element
   */
  saveRef = (element) => {
    this.node = findDOMNode(element)
  }

  /**
   * Save content node element
   *
   * @param {Element} element
   */
  saveContentRef = (element) => {
    this.content = findDOMNode(element)
  }

  /**
   * Render collapsible container
   *
   * @returns {React.Element}
   */
  render () {
    const { className, collapsed, smooth, children, animationSpeed, ...passedProps } = this.props

    // Build correct class names
    const clsName = buildClassName('collapse', className, { collapsed, smooth })
    const innerClsName = buildClassName([ 'collapse', 'content' ], null)

    return (
      <div className={clsName} {...passedProps} ref={this.saveRef}>
        <div className={innerClsName} ref={this.saveContentRef}>
          {children}
        </div>
      </div>
    )
  }
}

Collapse.displayName = 'Collapse'

Collapse.propTypes = propTypes
Collapse.defaultProps = defaultProps

export default Collapse

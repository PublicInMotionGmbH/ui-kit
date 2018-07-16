import React from 'react'
import PropTypes from 'prop-types'

import { findDOMNode } from 'react-dom'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional styles for collapse container */
  style: PropTypes.object,

  /** Additional class name for collapse container */
  className: PropTypes.string,

  /** Should it collapse smoothly? */
  smooth: PropTypes.bool,

  /** Is it collapsed? */
  collapsed: PropTypes.bool,

  /** Animation speed (in px/ms). */
  speed: PropTypes.number,

  /** Content for collapsed container */
  children: PropTypes.node
}

const defaultProps = {
  collapsed: true,
  smooth: true,
  speed: 200
}

/**
 * Component which represents Collapse.
 *
 * @property {object} props
 * @property {object} props.style
 * @property {string} props.className
 * @property {boolean} props.smooth
 * @property {boolean} props.collapsed
 * @property {number} props.speed
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
  componentDidMount () {
    this.updateHeight(this.props)
  }

  componentDidUpdate (prevProps) {
    this.raf = window.requestAnimationFrame(() => this.updateHeight(this.props))
  }

  componentWillUnmount () {
    window.cancelAnimationFrame(this.raf)
  }

  updateHeight = (props) => {
    // Use either passed props or current props
    props = props || this.props

    // Get desires height
    const height = !props.collapsed
      ? this.content.offsetHeight
      : 0

    // Update height when it is not the same
    if (this.height !== height) {
      const { smooth, speed } = this.props

      if (smooth && speed !== 0) {
        const currentHeight = this.node.offsetHeight
        const diff = Math.abs(currentHeight - height)
        const transitionTime = diff * 1000 / speed

        this.node.style.transitionDuration = transitionTime + 'ms'
      }

      this.height = height
      this.node.style.height = height + 'px'

      // Trigger reflow by using 'offsetHeight',
      // otherwise transition will not happen
      this.reflow = this.node.offsetHeight
    }

    // Try to update height dynamically again
    window.cancelAnimationFrame(this.raf)
    this.raf = window.requestAnimationFrame(() => this.updateHeight(this.props))
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
    const { className, collapsed, smooth, children, speed, style, ...passedProps } = this.props

    // Build styles for collapsible container
    const collapseStyle = {
      ...style
    }

    // Build correct class names
    const clsName = buildClassName('collapse', className, { collapsed, smooth })
    const innerClsName = buildClassName([ 'collapse', 'content' ], null)

    return (
      <div className={clsName} style={collapseStyle} {...passedProps} ref={this.saveRef}>
        <div className={innerClsName} ref={this.saveContentRef}>
          {children}
        </div>
      </div>
    )
  }
}

Collapse.propTypes = propTypes
Collapse.defaultProps = defaultProps

export default Collapse

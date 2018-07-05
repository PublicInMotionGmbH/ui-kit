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

  /** Animation time (in ms), requires geometry CSS */
  animationTime: PropTypes.number,

  /** Content for collapsed container */
  children: PropTypes.node
}

const defaultProps = {
  collapsed: true,
  smooth: true
}

const TRANSFORM_END = [
  'webkitTransitionEnd', 'otransitionend', 'oTransitionEnd', 'msTransitionEnd', 'transitionend',
  'animationend', 'oAnimationEnd', 'webkitAnimationEnd'
]

/**
 * Component which represents Collapse.
 *
 * @property {object} props
 * @property {boolean} props.collapsed
 * @property {number} props.heightBoost
 * @property {string} [props.className]
 *
 * @property {number|null} height
 * @property {number|null} reflowHeight
 *
 * @property {Element|null} node
 * @property {Element|null} content
 *
 * @class
 */
class Collapse extends React.PureComponent {
  height = null

  componentWillReceiveProps (props) {
    // Do nothing special when component hasn't changed it's collapsing state
    // Or it shouldn't be smooth
    if (props.collapsed === this.props.collapsed || !props.smooth || props.animationTime === 0) {
      return
    }

    // Change `maxHeight` of element
    this.makeTransition(props)
  }

  componentWillUnmount () {
    this.mounted = false

    // Stop listening for transition changes
    this.stopListening()
  }

  componentDidMount () {
    this.mounted = true

    // Start listening for transition changes
    this.startListening()
  }

  makeTransition (props) {
    // Use either next or current props
    props = props || this.props

    // Do not transit when it is not mounted
    if (!this.mounted) {
      return
    }

    // Get desired height
    const nextHeight = this.getHeight()

    // Do not update height when it is already the same
    if (nextHeight === this.height) {
      return
    }

    // Update with new height
    this.height = nextHeight

    // Update element maxHeight when it's mounted
    if (this.height != null) {
      this.node.style.maxHeight = this.height + 'px'

      // Trigger reflow by using 'offsetHeight',
      // otherwise transition will not happen
      this.reflowHeight = this.node.offsetHeight
    }

    // Try to update max-height dynamically again
    clearTimeout(this.dynamicTransitionTimeout)
    this.dynamicTransitionTimeout = setTimeout(() => this.makeTransition())
  }

  /**
   * Start listening for end of CSS transition/animation
   */
  startListening () {
    if (!this.node || !this.mounted) {
      return
    }

    for (let i = 0; i < TRANSFORM_END.length; i++) {
      this.node.addEventListener(TRANSFORM_END[i], this.finishTransition)
    }
  }

  /**
   * Stop listening for end of CSS transition/animation
   */
  stopListening () {
    if (!this.node) {
      return
    }

    // Stop updating max-height dynamically in transition time
    clearTimeout(this.dynamicTransitionTimeout)

    for (let i = 0; i < TRANSFORM_END.length; i++) {
      this.node.removeEventListener(TRANSFORM_END[i], this.finishTransition)
    }
  }

  /**
   * Get content desired height
   *
   * @returns {null|number}
   */
  getHeight () {
    if (!this.mounted || !this.content) {
      return null
    }

    return this.content.offsetHeight
  }

  /**
   * When transition is finished,
   * remove 'maxHeight' to allow use component as normally
   *
   * @param {Event} event
   */
  finishTransition = (event) => {
    // Ignore if transition has finished in different place
    if (event.target !== this.node) {
      return
    }

    // Get styles to check if default element is overriding max height
    const { style } = this.props

    // Stop updating max-height dynamically now
    clearTimeout(this.dynamicTransitionTimeout)

    if (style && style.maxHeight != null) {
      // Render whole component if it's using `maxHeight`
      this.height = null
      this.forceUpdate()
    } else {
      // Or simply change `maxHeight` style in node
      this.height = null
      this.node.style.maxHeight = ''
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
    const { className, collapsed, smooth, children, style, animationTime, ...passedProps } = this.props
    const height = this.height

    // Calculate animation time
    const time = parseInt(animationTime, 10) || null

    // Build styles for collapsible container
    const collapseStyle = {
      ...style
    }

    if (height !== null) {
      collapseStyle.maxHeight = height
    }

    // Apply animation time
    if (smooth && time) {
      collapseStyle.transitionDuration = time + 'ms'
      collapseStyle.animationDuration = time + 'ms'
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

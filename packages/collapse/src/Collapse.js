import React from 'react'
import PropTypes from 'prop-types'

import { findDOMNode } from 'react-dom'

import { buildClassName } from '@talixo/shared'

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
 * @property {object} state
 * @property {number|null} state.height
 *
 * @property {Element|null} node
 * @property {Element|null} content
 *
 * @class
 */
class Collapse extends React.PureComponent {
  constructor (props) {
    super(props)

    this.saveRef = this.saveRef.bind(this)
    this.saveContentRef = this.saveContentRef.bind(this)
    this.finishTransition = this.finishTransition.bind(this)

    this.state = {
      height: null
    }
  }

  componentWillReceiveProps (props) {
    // Do nothing special when component hasn't changed it's collapsing state
    // Or it shouldn't be smooth
    if (props.collapsed === this.props.collapsed || !props.smooth) {
      return
    }

    // Change `maxHeight` of element

    // Get desired height
    this.state.height = this.getHeight()

    // Update element maxHeight when it's mounted
    if (this.state.height) {
      this.node.style.maxHeight = this.state.height + 'px'

      // Trigger reflow by using 'offsetHeight',
      // otherwise transition will not happen
      this.height = this.node.offsetHeight
    }
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
  finishTransition (event) {
    // Ignore if transition has finished in different place
    if (event.target !== this.node) {
      return
    }

    // Get styles to check if default element is overriding max height
    const { style } = this.props

    if (style && style.maxHeight != null) {
      // Render whole component if it's using `maxHeight`
      this.setState({ height: null })
    } else {
      // Or simply change `maxHeight` style in node
      this.state.height = null
      this.node.style.maxHeight = ''
    }
  }

  /**
   * Save base node element
   *
   * @param {Element} element
   */
  saveRef (element) {
    this.node = findDOMNode(element)
  }

  /**
   * Save content node element
   *
   * @param {Element} element
   */
  saveContentRef (element) {
    this.content = findDOMNode(element)
  }

  /**
   * Render collapsible container
   *
   * @returns {React.Element}
   */
  render () {
    const { className, collapsed, smooth, children, style, animationTime, ...passedProps } = this.props
    const { height } = this.state

    // Calculate animation time
    const time = parseInt(animationTime, 10) || null

    // Build styles for collapsible container
    const collapseStyle = {
      ...style,
      maxHeight: height
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

Collapse.propTypes = {
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

Collapse.defaultProps = {
  collapsed: true,
  smooth: true
}

export default Collapse

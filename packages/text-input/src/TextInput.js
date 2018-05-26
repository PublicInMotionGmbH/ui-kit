import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import calculateInputStyles from '../utils/calculateInputStyles'

// Check if we are currently in environment which supports browser
const isBrowser = typeof document !== 'undefined' && typeof window !== 'undefined'

const moduleName = 'text-input'

/**
 * Component which represents Text Input.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {boolean} [props.error]
 * @property {function} [props.inputRef]
 * @property {function} [props.onChange]
 * @property {function} [props.InputComponent]
 * @property {string} [props.placeholder]
 * @property {string} [props.size]
 * @property {object} [props.style]
 *
 * @property {object} state
 * @property {string|null} state.hash
 * @property {object|null} state.suffixStyle
 * @property {object|null} state.inputStyle
 *
 * @property {boolean} hasSuffixInitialized
 *
 * @class
 */
class TextInput extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      hash: null,
      suffixStyle: { position: 'absolute', visibility: 'hidden', pointerEvents: 'none' },
      inputStyle: null
    }

    this.hasSuffixInitialized = false

    this.onInputChange = this.onInputChange.bind(this)
    this.updateStyles = this.updateStyles.bind(this)
    this.inputRef = this.inputRef.bind(this)
    this.suffixRef = this.suffixRef.bind(this)
  }

  /**
   * Initialize styles (and listeners) for suffix
   */
  initializeSuffixStyles () {
    // Do not work with styles within Node.js environment
    if (!isBrowser) {
      return
    }

    // Do not try initializing suffix styles twice
    if (this.hasSuffixInitialized) {
      return
    }

    // Update suffix and input styles
    this.updateStyles()

    // When component is mounted but styles are still not loaded,
    // It may occur that your suffix is badly positioned.
    window.addEventListener('load', this.updateStyles)
    window.addEventListener('resize', this.updateStyles)

    // Mark initialization as finished
    this.hasSuffixInitialized = true
  }

  /**
   * Tear down styles (and listeners) for suffix
   */
  deinitializeSuffixStyles () {
    // Do not work with styles within Node.js environment
    if (!isBrowser) {
      return
    }

    // Do not try de-initializing suffix styles when they are ready
    if (!this.hasSuffixInitialized) {
      return
    }

    // Remove listener for loaded or resized window
    window.removeEventListener('load', this.updateStyles)
    window.removeEventListener('resize', this.updateStyles)

    // Mark initialization as not done
    this.hasSuffixInitialized = false

    // Update styles to empty them
    this.setState({
      hash: null,
      suffixStyle: { position: 'absolute', visibility: 'hidden', pointerEvents: 'none' },
      inputStyle: null
    })
  }

  /**
   * Position suffix after component is mounted
   */
  componentDidMount () {
    if (this.props.suffix != null) {
      this.initializeSuffixStyles()
    }
  }

  /**
   * Remove listener on unmounting, which is waiting for loaded styles
   */
  componentWillUnmount () {
    this.deinitializeSuffixStyles()
  }

  /**
   * Update suffix when component is updated
   */
  componentDidUpdate () {
    if (this.props.suffix == null) {
      // Try to de-initialize styles when there is no suffix
      this.deinitializeSuffixStyles()
    } else if (this.hasSuffixInitialized) {
      // Update styles if there is already suffix initialized
      this.updateStyles()
    } else {
      // Initialize suffix styles when suffix has been added, but it's not initialized yet
      this.initializeSuffixStyles()
    }
  }

  /**
   * Handle input change
   *
   * @param {SyntheticEvent} e
   */
  onInputChange (e) {
    const { onChange } = this.props

    // Update styles connected to suffix
    this.updateStyles()

    // Trigger change to parent components
    if (onChange) {
      onChange(e.target.value)
    }
  }

  /**
   * Helper method to check if it should calculate styles
   *
   * @returns {boolean}
   */
  shouldCalculateStyles () {
    // Do not try to update styles in Node.js environment
    if (!isBrowser) {
      return false
    }

    // Do not update styles while document is not loaded yet
    if (document.readyState !== 'complete' && document.readyState !== 'interactive') {
      return false
    }

    // Don't try to calculate styles when there is no suffix or input
    if (!this.input || !this.suffix) {
      return false
    }

    return true
  }

  /**
   * Update suffix & input styles
   */
  updateStyles () {
    // Do not update styles if browser is not ready yet
    if (!this.shouldCalculateStyles()) {
      return
    }

    // Calculate styles for input & suffix
    const s = calculateInputStyles(this.input, this.suffix)

    // Ignore change if hash of dimensions is the same
    if (s.hash === this.state.hash) {
      return
    }

    // Update component styles
    this.setState({
      hash: s.hash,
      suffixStyle: s.suffix,
      inputStyle: s.input
    })
  }

  /**
   * Cache reference to input element
   *
   * @param {HTMLElement} el
   */
  inputRef (el) {
    const { inputRef } = this.props

    this.input = el

    if (inputRef) {
      inputRef(el)
    }
  }

  /**
   * Cache reference to suffix element
   *
   * @param {HTMLElement} el
   */
  suffixRef (el) {
    this.suffix = el
  }

  /**
   * Check if there is any value inside
   *
   * @returns {boolean}
   */
  isEmpty () {
    const { value } = this.props

    // Validate when component is not controlled from outside
    if (this.input && value == null) {
      return this.input.value === ''
    }

    return value == null || value === ''
  }

  /**
   * Build addon component (either 'left' or 'right')
   *
   * @param {string} which
   * @returns {React.Element}
   */
  buildAddon (which) {
    return (
      <span className={buildClassName([ moduleName, which ])}>
        {this.props[which]}
      </span>
    )
  }

  /**
   * Build suffix component
   *
   * @returns {React.Element}
   */
  buildSuffix () {
    const { suffix } = this.props
    const { suffixStyle } = this.state

    return (
      <span
        ref={this.suffixRef}
        className={buildClassName([ moduleName, 'suffix' ])}
        style={suffixStyle}
      >
        {suffix}
      </span>
    )
  }

  /**
   * Render text input
   *
   * @returns {React.Element}
   */
  render () {
    const { className, error, inputRef, onChange, InputComponent, style, value, suffix, left, right, ...restProps } = this.props

    // Initialize helper variables
    const hasLeft = left != null
    const hasRight = right != null
    const hasSuffix = suffix != null

    // Build classes for wrapper
    const wrapperClasses = buildClassName(moduleName, className, {
      'with-left': hasLeft,
      'with-right': hasRight,
      'with-suffix': hasSuffix,
      'empty': this.isEmpty(),
      'error': error
    })

    // Build available and required elements
    const leftElement = hasLeft ? this.buildAddon('left') : null
    const rightElement = hasRight ? this.buildAddon('right') : null
    const suffixElement = hasSuffix ? this.buildSuffix() : null

    // Build text input component
    return (
      <div className={wrapperClasses} style={style}>
        {leftElement}

        <InputComponent
          className={buildClassName([ moduleName, 'input' ])}
          onChange={this.onInputChange}
          ref={this.inputRef}
          style={this.state.inputStyle}
          value={value}
          {...restProps}
        />

        {suffixElement}
        {rightElement}
      </div>
    )
  }
}

TextInput.propTypes = {
  /** Additional class name for text input wrapper */
  className: PropTypes.string,

  /** Indicates that input has error */
  error: PropTypes.bool,

  /** Ref passed to input element */
  inputRef: PropTypes.func,

  /** Callback for change event */
  onChange: PropTypes.func,

  /** Additional input wrapper styling */
  style: PropTypes.object,

  /** Suffix to show after input value */
  suffix: PropTypes.any,

  /** Left side icon or controls */
  left: PropTypes.node,

  /** Right side icon or controls */
  right: PropTypes.node,

  /** Component used for input below */
  InputComponent: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ])
}

TextInput.defaultProps = {
  InputComponent: 'input',
  error: false,
  type: 'text'
}

export default TextInput

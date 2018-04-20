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
 * @property {function} [props.onChange]
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
   * Update suffix & input styles
   */
  updateStyles () {
    // Do not try to update styles in Node.js environment
    if (!isBrowser) {
      return
    }

    // Do not update styles while document is not loaded yet
    if (document.readyState !== 'complete' && document.readyState !== 'interactive') {
      return
    }

    // Don't try to calculate styles when there is no suffix or input
    if (!this.input || !this.suffix) {
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
    this.input = el
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
   * Render text input
   *
   * @returns {React.Element}
   */
  render () {
    const { className, error, onChange, size, style, value, suffix, left, right, ...restProps } = this.props
    const { suffixStyle, inputStyle } = this.state

    // Initialize helper variables
    const hasLeft = left != null
    const hasRight = right != null
    const hasSuffix = suffix != null
    const isEmpty = this.input && value == null ? this.input.value === '' : (value == null || value === '')

    // Build classes for `input` element
    const inputClasses = buildClassName(moduleName)

    // Build classes for wrapper
    const wrapperClasses = buildClassName([ moduleName, 'wrapper' ], className, [ size ], {
      'with-left': hasLeft,
      'with-right': hasRight,
      'with-suffix': hasSuffix,
      'empty': isEmpty,
      'error': error
    })

    // Build 'left' element if it's available
    const leftElement = hasLeft ? (
      <span className={buildClassName([ moduleName, 'left' ])}>
        {left}
      </span>
    ) : null

    // Build 'right' element if it's available
    const rightElement = hasRight ? (
      <span className={buildClassName([ moduleName, 'right' ])}>
        {right}
      </span>
    ) : null

    // Build 'suffix' element if it's available, apply styles additionally
    const suffixElement = hasSuffix ? (
      <span
        ref={this.suffixRef}
        className={buildClassName([ moduleName, 'suffix' ])}
        style={suffixStyle}
      >
        {suffix}
      </span>
    ) : null

    // Build text input component
    return (
      <div className={wrapperClasses} style={style}>
        {leftElement}

        <input
          className={inputClasses}
          onChange={this.onInputChange}
          ref={this.inputRef}
          style={inputStyle}
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

  /** Callback for change event */
  onChange: PropTypes.func,

  /** Size of text input (can be 'small') */
  size: PropTypes.oneOf([ 'small' ]),

  /** Additional input wrapper styling */
  style: PropTypes.object,

  /** Suffix to show after input value */
  suffix: PropTypes.any,

  /** Left side icon or controls */
  left: PropTypes.node,

  /** Right side icon or controls */
  right: PropTypes.node
}

TextInput.defaultProps = {
  error: false,
  type: 'text'
}

export default TextInput

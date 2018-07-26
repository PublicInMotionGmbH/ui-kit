import React from 'react'
import { findDOMNode } from 'react-dom'

import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import calculateInputStyles from '../utils/calculateInputStyles'

// Check if we are currently in environment which supports browser
const isBrowser = typeof document !== 'undefined' && typeof window !== 'undefined'

const moduleName = 'text-input'

const propTypes = {
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

  /** Value to put inside input */
  value: PropTypes.string,

  /** Component used for input below */
  InputComponent: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ]),

  /** Should put caret on end of input always when user focus it? */
  endCaretOnFocus: PropTypes.bool
}

const defaultProps = {
  InputComponent: 'input',
  error: false,
  type: 'text',
  endCaretOnFocus: false
}

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
 * @property {boolean} hasElementsInitialized
 * @property {function} [endCaretListener]
 * @property {HTMLElement} [input]
 * @property {HTMLElement} [suffix]
 *
 * @class
 */
class TextInput extends React.PureComponent {
  state = {
    value: this.props.value == null ? '' : this.props.value,
    hash: null,
    suffixStyle: { position: 'absolute', visibility: 'hidden', pointerEvents: 'none' },
    inputStyle: null
  }
  hasElementsInitialized = false

  /**
   * Initialize styles (and listeners) for elements (left, right, suffix)
   */
  initializeElementsStyles () {
    // Do not work with styles within Node.js environment
    if (!isBrowser) {
      return
    }

    // Do not try initializing suffix styles twice
    if (this.hasElementsInitialized) {
      return
    }

    // Update suffix and input styles
    this.updateStyles()

    // When component is mounted but styles are still not loaded,
    // It may occur that your suffix is badly positioned.
    window.addEventListener('load', this.updateStyles)
    window.addEventListener('resize', this.updateStyles)

    // Mark initialization as finished
    this.hasElementsInitialized = true
  }

  /**
   * Tear down styles (and listeners) for suffix
   */
  deinitializeElementsStyles () {
    // Do not work with styles within Node.js environment
    if (!isBrowser) {
      return
    }

    // Do not try de-initializing suffix styles when they are ready
    if (!this.hasElementsInitialized) {
      return
    }

    // Remove listener for loaded or resized window
    window.removeEventListener('load', this.updateStyles)
    window.removeEventListener('resize', this.updateStyles)

    // Mark initialization as not done
    this.hasElementsInitialized = false

    // Update styles to empty them
    this.setState({
      hash: null,
      suffixStyle: { position: 'absolute', visibility: 'hidden', pointerEvents: 'none' },
      inputStyle: null
    })
  }

  componentWillReceiveProps (props) {
    if (props.value != null && props.value !== this.props.value) {
      this.setState({ value: props.value })
    }

    if (props.endCaretOnFocus !== this.props.endCaretOnFocus) {
      this.initializeEndCaretOnFocus()
    }
  }

  /**
   * Position suffix after component is mounted
   */
  componentDidMount () {
    if (this.hasAdditionalElements()) {
      this.initializeElementsStyles()
    }

    this.initializeEndCaretOnFocus()
  }

  /**
   * Remove listener on unmounting, which is waiting for loaded styles
   */
  componentWillUnmount () {
    this.deinitializeElementsStyles()
    this.unregisterEndCaretOnFocus()
  }

  /**
   * Update suffix when component is updated
   */
  componentDidUpdate () {
    if (!this.hasAdditionalElements()) {
      // Try to de-initialize styles when there is no suffix
      this.deinitializeElementsStyles()
    } else if (this.hasElementsInitialized) {
      // Update styles if there is already suffix initialized
      this.updateStyles()
    } else {
      // Initialize suffix styles when suffix has been added, but it's not initialized yet
      this.initializeElementsStyles()
    }
  }

  /**
   * Initialize focus event when it's needed, where caret is put on end.
   *
   * @param {object} [props]
   * @param {boolean} [props.endCaretOnFocus]
   */
  initializeEndCaretOnFocus (props) {
    const { endCaretOnFocus } = props || this.props

    if (endCaretOnFocus) {
      this.registerEndCaretOnFocus()
    } else {
      this.unregisterEndCaretOnFocus()
    }
  }

  /**
   * Register focus event, where caret is put on end.
   *
   * @param {HTMLElement} [input]
   */
  registerEndCaretOnFocus (input) {
    // Do not work with events within Node.js environment
    if (!isBrowser) {
      return
    }

    if (!input) {
      input = this.input
    }

    if (!input) {
      return
    }

    if (this.endCaretListener) {
      return
    }

    this.endCaretListener = () => setTimeout(this.putCaretOnEnd.bind(this, input))
    input.addEventListener('focus', this.endCaretListener)
  }

  /**
   * Unregister focus event, where caret is put on end.
   *
   * @param {HTMLElement} [input]
   */
  unregisterEndCaretOnFocus (input) {
    // Do not work with events within Node.js environment
    if (!isBrowser) {
      return
    }

    if (!input) {
      input = this.input
    }

    if (!input) {
      return
    }

    if (!this.endCaretListener) {
      return
    }

    input.removeEventListener('focus', this.endCaretListener)
    this.endCaretListener = null
  }

  /**
   * Put caret on end of input.
   *
   * @param {HTMLElement} input
   */
  putCaretOnEnd (input) {
    const value = input.value
    const length = value ? value.length : 0

    // Don't do anything when it's empty anyway
    if (length === 0) {
      return
    }

    const previousType = input.type

    // Types different than "text" may not support selection, i.e. "number"
    if (previousType !== 'text') {
      input.type = 'text'
    }

    if (input.setSelectionRange) {
      input.setSelectionRange(length, length)
    } else if (input.createTextRange) {
      const range = input.createTextRange()
      range.moveStart('character', length)
      range.select()
    } else {
      input.value = ''
      input.value = value
    }

    if (previousType !== 'text') {
      input.type = previousType
    }
  }

  /**
   * Handle input change
   *
   * @param {SyntheticEvent} e
   */
  onInputChange = (e) => {
    const { value, onChange } = this.props
    const nextValue = e.target.value

    // Update styles connected to suffix
    this.updateStyles()

    if (value == null) {
      this.setState({ value: nextValue })
    }

    // Trigger change to parent components
    if (onChange) {
      onChange(nextValue)
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
    if (!this.input || !(this.hasAdditionalElements())) {
      return false
    }

    return true
  }

  /**
   * Check if any additional element is passed to input.
   * @returns {boolean}
   */
  hasAdditionalElements () {
    return this.props.suffix != null || this.props.left != null || this.props.right != null
  }

  /**
   * Update suffix & input styles
   */
  updateStyles = () => {
    // Do not update styles if browser is not ready yet
    if (!this.shouldCalculateStyles()) {
      return
    }

    // Calculate styles for input & suffix
    const s = calculateInputStyles(this.input, this.suffix, this.left, this.right)

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
  inputRef = (el) => {
    const { inputRef } = this.props

    if (this.input) {
      this.unregisterEndCaretOnFocus(this.input)
    }

    this.input = findDOMNode(el)
    this.initializeEndCaretOnFocus()

    if (inputRef) {
      inputRef(this.input)
    }
  }

  /**
   * Cache reference to suffix element
   *
   * @param {HTMLElement} el
   */
  suffixRef = (el) => {
    this.suffix = findDOMNode(el)
  }

  /**
   * Cache reference to left/right element
   *
   * @param {HTMLElement} el
   */
  elementRef = (which, el) => {
    this[which] = findDOMNode(el)
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
      <span ref={this.elementRef.bind(this, which)} className={buildClassName([ moduleName, which ])}>
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
    const {
      className, error, inputRef, onChange, onFocus, InputComponent,
      style, value, suffix, left, right, endCaretOnFocus, ...restProps
    } = this.props
    const _value = this.state.value

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
          value={_value}
          {...restProps}
        />

        {suffixElement}
        {rightElement}
      </div>
    )
  }
}

TextInput.propTypes = propTypes
TextInput.defaultProps = defaultProps

export default TextInput

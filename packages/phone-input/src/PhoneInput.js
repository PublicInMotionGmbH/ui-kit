import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import TextMaskInput from 'react-text-mask'

import { buildClassName } from '@talixo/shared'

import { SelectBox } from '@talixo/combo-box'
import { CountryFlag } from '@talixo/country-flag'

import countriesList from '../utils/countriesList'
import detectCountry from '../utils/detectCountry'
import replaceCountryPrefix from '../utils/replaceCountryPrefix'
import buildMaskForCountry from '../utils/buildMaskForCountry'

export const moduleName = 'phone-input'

const propTypes = {
  /** Additional class name for wrapper */
  className: PropTypes.string,

  /** Indicates that input has error */
  error: PropTypes.bool,

  /** Phone number to put inside (control from outside) */
  value: PropTypes.string,

  /** Placeholder value, when no number is set */
  placeholder: PropTypes.string,

  /** Event handler when number is changed */
  onChange: PropTypes.func,

  /** Event handler when input has lost focus */
  onBlur: PropTypes.func,

  /** Event handler when input has been focused */
  onFocus: PropTypes.func,

  /** ID passed to control element */
  id: PropTypes.string,

  /** Should it be disabled? */
  disabled: PropTypes.bool,

  /** Should it be read-only? */
  readOnly: PropTypes.bool
}

const defaultProps = {
  error: false,
  disabled: false,
  readOnly: false
}

/**
 * Trim value (including \u2000 placeholders).
 *
 * @param {string} value
 * @returns {string}
 */
function trim (value) {
  return value.replace(/[\u2000]+/g, '').trim()
}

/**
 * Set caret position in specified element.
 *
 * @param {HTMLElement} element
 * @param {number} position
 */
function setCaretPosition (element, position) {
  if (!element) {
    return
  }

  if (element.setSelectionRange) {
    element.focus()
    element.setSelectionRange(position, position)
  }
}

/**
 * Render country with prefix as dropdown item.
 *
 * @param {object|{ code: string, prefix: string, name: string }} country
 * @returns {React.Element}
 */
function renderCountryItem (country) {
  return (
    <div className={buildClassName([ moduleName, 'country' ])}>
      <CountryFlag code={country.code} />
      <div className={buildClassName([ moduleName, 'country', 'description' ])}>
        <strong>{country.prefix}</strong>
        <span>{country.name}</span>
      </div>
    </div>
  )
}

/**
 * Component which represents input to provided phone number.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {boolean} [props.error]
 * @property {string} [props.value]
 * @property {string} [props.placeholder]
 * @property {function} [props.onChange]
 * @property {function} [props.onFocus]
 * @property {function} [props.onBlur]
 * @property {boolean} [props.disabled]
 * @property {boolean} [props.readOnly]
 *
 * @property {object} state
 * @property {string} state.value
 * @property {boolean} state.focused
 * @property {string|null} [state.country]
 * @property {boolean|string[]} state.focus
 * @property {boolean|string[]} state.hover
 *
 * @class
 */
class PhoneInput extends React.PureComponent {
  state = {
    value: this.props.value || '',
    country: detectCountry(this.props.value),

    hover: false,
    focus: false,

    // Hack for text-mask-input
    focused: false
  }

  /**
   * Pass value when component is controlled from outside.
   *
   * @param {object} props
   * @param {string} [props.value]
   */
  componentWillReceiveProps (props) {
    if (props.value != null && props.value !== this.state.value) {
      this.setState({
        value: props.value,
        country: detectCountry(props.value)
      })
    }
  }

  /**
   * Clear all timers when component is unmounted.
   */
  componentWillUnmount () {
    clearTimeout(this.caretTimeout)
    clearTimeout(this.focusTimeout)
  }

  /**
   * Request change of phone number.
   *
   * @param {string} value
   */
  change (value) {
    const { disabled, readOnly } = this.props

    if (disabled || readOnly) {
      return
    }

    value = trim(value)

    // Update state immediately, when component is self-controlled
    if (this.props.value == null) {
      this.setState({ value })
    }

    // Detect current country by prefix
    const country = detectCountry(value)

    // Change country if it's different
    if (country !== this.state.country) {
      this.setState({ country })
    }

    // Trigger 'change' event
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  /**
   * Change country prefix in current phone number.
   *
   * @param {object} country
   */
  changeCountry = (country) => {
    const { disabled, readOnly } = this.props

    if (disabled || readOnly) {
      return
    }

    const nextValue = replaceCountryPrefix(this.state.value, this.state.country, country)
    const endPrefix = nextValue.indexOf(' ') + 1

    this.change(nextValue)

    // Focus input when it is possible,
    // and move cursor after prefix
    if (this.el) {
      this.el.focus()

      if (endPrefix) {
        clearTimeout(this.caretTimeout)
        this.caretTimeout = setTimeout(() => setCaretPosition(this.el, endPrefix))
      }
    }
  }

  /**
   * Save reference to input, to allow focusing it later.
   *
   * @param {HTMLElement} node
   */
  saveRef = (node) => {
    this.el = findDOMNode(node)
  }

  onInputMouseOver = () => this.setMouseOverState('input')
  onInputMouseOut = () => this.setMouseOutState('input')
  onInputFocus = (...args) => this.setFocusState('input', args)
  onInputBlur = (...args) => this.setBlurState('input', args)

  onListMouseOver = () => this.setMouseOverState('flags')
  onListMouseOut = () => this.setMouseOutState('flags')
  onListFocus = (...args) => this.setFocusState('flags', args)
  onListBlur = (...args) => this.setBlurState('flags', args)

  /**
   * Set hover state
   *
   * @param {string} what
   */
  setMouseOverState (what) {
    const hover = this.state.hover ? this.state.hover.filter(x => x !== what) : []
    hover.push(what)
    this.setState({ hover })
  }

  /**
   * Set dis-hover state.
   *
   * This needs to be delayed by setTimeout,
   * because 'mouseOut' will happen before 'mouseEnter'.
   *
   * Broken scenario without delay:
   *
   * Given: user who has hover on flags drop-down
   * When: he moves cursor to input
   * Then:
   *   - handle 'mouseout' on flags drop-down
   *   - lose hover status on PhoneInput
   *   - handle 'mouseover' on input
   *   - set hover status on PhoneInput
   * Result: PhoneInput is blinking
   *
   * @param {string} what
   */
  setMouseOutState (what) {
    setTimeout(() => {
      const hover = this.state.hover ? this.state.hover.filter(x => x !== what) : []
      this.setState({ hover: hover.length ? hover : false })
    })
  }

  /**
   * Set focus state
   *
   * @param {string} what
   * @param {array} args
   */
  setFocusState (what, args) {
    const { onFocus } = this.props

    const focus = this.state.focus ? this.state.focus.filter(x => x !== what) : []
    focus.push(what)

    // Component changed state to focused, so fire Focus event
    if (onFocus && (!this.state.focus || focus.length > this.state.focus.length)) {
      onFocus(...args)
    }

    this.setState({ focus })
  }

  /**
   * Set blur state
   *
   * This needs to be delayed by setTimeout,
   * because 'blur' will happen before 'focus'.
   *
   * @see {PhoneInput.setMouseOutState}
   *
   * @param {string} what
   * @param {array} args
   */
  setBlurState (what, args) {
    const { onBlur } = this.props

    setTimeout(() => {
      const focus = this.state.focus ? this.state.focus.filter(x => x !== what) : []

      // Component changed state to blurred, so fire Blur event
      if (onBlur && focus.length === 0 && this.state.focus && this.state.focus.length) {
        onBlur()
      }

      this.setState({ focus: focus.length ? focus : false })
    })
  }

  /**
   * Render SelectBox with countries and prefixes.
   *
   * @returns {React.Element}
   */
  renderCountryBox () {
    const { disabled, readOnly } = this.props

    return (
      <SelectBox
        tabIndex={-1}
        disabled={disabled}
        readOnly={readOnly}
        className={buildClassName([ moduleName, 'country-box' ])}
        options={countriesList}
        value={this.state.country}
        placeholder={<span className={buildClassName([ moduleName, 'unknown-flag' ])} />}
        renderValue={country => <CountryFlag code={country.code} />}
        renderItem={renderCountryItem}
        buildItemId={country => country.code}
        onChange={this.changeCountry}
        onFocus={this.onListFocus}
        onBlur={this.onListBlur}
        onMouseEnter={this.onListMouseOver}
        onMouseLeave={this.onListMouseOut}
      />
    )
  }

  /**
   * Handle focusing text input.
   *
   * @param {Event|SyntheticEvent} event
   */
  focus = (event) => {
    this.onInputFocus(event)

    // Make sure that user can't click on some place in input, where it guides him
    // TODO: when react-text-mask will properly work with removing placeholder character, remove it
    clearTimeout(this.focusTimeout)
    this.focusTimeout = setTimeout(() => this.setState({
      focused: true
    }))
  }

  /**
   * Handle losing focus on text input.
   *
   * @param {Event|SyntheticEvent} event
   */
  blur = (event) => {
    const { onBlur } = this.props

    this.onInputBlur(event)

    this.setState({ focused: false })

    if (onBlur) {
      onBlur(event)
    }
  }

  /**
   * Render input with phone number.
   *
   * @returns {React.Element}
   */
  renderInput () {
    const { placeholder, id, disabled, readOnly } = this.props
    const { value, country, focused } = this.state

    return (
      <TextMaskInput
        id={id}
        disabled={disabled}
        readOnly={readOnly}
        guide={focused}
        keepCharPositions={false}
        mask={buildMaskForCountry(country)}
        placeholderChar={'\u2000'}
        inputMode='numeric'
        type='tel'
        ref={this.saveRef}
        value={value}
        placeholder={placeholder}
        onChange={e => this.change(e.target.value)}
        onMouseEnter={this.onInputMouseOver}
        onMouseOut={this.onInputMouseOut}
        onMouseLeave={this.onInputMouseOut}
        onFocus={this.focus}
        onBlur={this.blur}

        // There is "tel" auto complete type defined for mobile phone with prefix, but unfortunately it's not including it in common browsers (Chrome, Safari etc)
        autoComplete='off'
      />
    )
  }

  /**
   * Render phone number input control.
   *
   * @returns {React.Element}
   */
  render () {
    const {
      className, error, onChange, onFocus, onBlur,
      placeholder, id, value, disabled, readOnly, ...passedProps
    } = this.props
    const { hover, focus } = this.state

    const clsName = buildClassName(moduleName, className, {
      error,
      hover: hover && hover.length,
      focus: focus && focus.length,
      disabled: disabled,
      'read-only': readOnly
    })

    return (
      <span className={clsName} {...passedProps}>
        {this.renderCountryBox()}
        {this.renderInput()}
      </span>
    )
  }
}

PhoneInput.propTypes = propTypes

PhoneInput.defaultProps = defaultProps

export default PhoneInput

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
  onFocus: PropTypes.func
}

const defaultProps = {
  error: false
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
 *
 * @property {object} state
 * @property {string} state.value
 * @property {string|null} [state.country]
 *
 * @class
 */
class PhoneInput extends React.PureComponent {
  state = {
    value: this.props.value || '',
    focused: false,
    country: detectCountry(this.props.value)
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
   * Request change of phone number.
   *
   * @param {string} value
   */
  change (value) {
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
    this.change(replaceCountryPrefix(this.state.value, this.state.country, country))

    // Focus input when it is possible
    if (this.el) {
      this.el.focus()
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

  /**
   * Render SelectBox with countries and prefixes.
   *
   * @returns {React.Element}
   */
  renderCountryBox () {
    return (
      <SelectBox
        className={buildClassName([ moduleName, 'country-box' ])}
        options={countriesList}
        value={this.state.country}
        renderValue={country => <CountryFlag code={country.code} />}
        renderItem={renderCountryItem}
        buildItemId={country => country.code}
        onChange={this.changeCountry}
      />
    )
  }

  /**
   * Handle focusing text input.
   *
   * @param {Event|SyntheticEvent} event
   */
  focus = (event) => {
    const { onFocus } = this.props

    // Make sure that user can't click on some place in input, where it guides him
    // TODO: when react-text-mask will properly work with removing placeholder character, remove it
    clearTimeout(this.focusTimeout)
    this.focusTimeout = setTimeout(() => this.setState({
      focused: true
    }))

    if (onFocus) {
      onFocus(event)
    }
  }

  /**
   * Handle losing focus on text input.
   *
   * @param {Event|SyntheticEvent} event
   */
  blur = (event) => {
    const { onBlur } = this.props

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
    const { placeholder } = this.props
    const { value, country, focused } = this.state

    return (
      <TextMaskInput
        guide={focused}
        keepCharPositions={false}
        mask={buildMaskForCountry(country)}
        placeholderChar={'\u2000'}
        type='tel'
        ref={this.saveRef}
        value={value}
        placeholder={placeholder}
        onChange={e => this.change(e.target.value)}
        onFocus={this.focus}
        onBlur={this.blur}
      />
    )
  }

  /**
   * Render phone number input control.
   *
   * @returns {React.Element}
   */
  render () {
    const { className, error, onChange, onFocus, onBlur, placeholder, ...passedProps } = this.props

    return (
      <span className={buildClassName(moduleName, className, {error})} {...passedProps}>
        {this.renderCountryBox()}
        {this.renderInput()}
      </span>
    )
  }
}

PhoneInput.propTypes = propTypes

PhoneInput.defaultProps = defaultProps

export default PhoneInput

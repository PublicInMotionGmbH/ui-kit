import React from 'react'
import PropTypes from 'prop-types'
import TextMaskInput from 'react-text-mask'

import { TextInput } from '@talixo/text-input'
import { Icon } from '@talixo/icon'

import { buildClassName } from '@talixo/shared'

const moduleName = 'credit-card-number-input'

const propTypes = {
  /** Additional class name passed to wrapper. */
  className: PropTypes.string,

  /** Handler for onBlur event. */
  onBlur: PropTypes.func,

  /** Handler for onChange event. */
  onChange: PropTypes.func,

  /** Handler for onFocus event. */
  onFocus: PropTypes.func,

  /** Value to be displayed inside inputs. */
  value: PropTypes.string
}

const defaultProps = {}

const MASK = [
  // Credit card has 13-19 digits
  /\d/, /\d/, /\d/, /\d/, ' ',
  /\d/, /\d/, /\d/, /\d/, ' ',
  /\d/, /\d/, /\d/, /\d/, ' ',
  /\d/, /\d/, /\d/, /\d/, ' ',
  /\d/, /\d/, /\d/
]

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
 * Component which represents credit card input.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {func} [props.onBlur]
 * @property {func} [props.onChange]
 * @property {func} [props.onFocus]
 * @property {string} [props.value]
 *
 * @property {object} state
 * @property {boolean} state.focused
 * @property {string|null} state.value
 *
 * @class
 */
class CreditCardNumberInput extends React.PureComponent {
  state = {
    focused: false,
    value: this.props.value == null ? '' : this.props.value
  }

  /**
   * Update current value in component state,
   * when value is controlled.
   *
   * @param {object} nextProps
   */
  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value && nextProps.value != null) {
      this.setState({ value: nextProps.value })
    }
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
   * Handle change on text input.
   *
   * @param {string} value
   */
  change = (value) => {
    const { onChange } = this.props
    value = trim(value)

    if (this.state.value === value) {
      return
    }

    if (this.props.value == null) {
      this.setState({ value })
    }

    if (onChange) {
      onChange(value)
    }
  }

  /**
   * Render credit card input component.
   *
   * @returns {React.Element}
   */
  render () {
    const { className, value, onChange, onFocus, onBlur, ...passedProps } = this.props
    const { focused } = this.state

    // Build class name
    const clsName = buildClassName(moduleName, className)

    return (
      <TextInput
        className={clsName}
        guide={focused}
        keepCharPositions={false}
        mask={MASK}
        placeholderChar={'\u2000'}
        value={this.state.value}
        onChange={this.change}
        onFocus={this.focus}
        onBlur={this.blur}
        left={<Icon name='credit_card' />}
        placeholder='0000 0000 0000 0000'
        InputComponent={TextMaskInput}
        {...passedProps}
      />
    )
  }
}

CreditCardNumberInput.propTypes = propTypes

CreditCardNumberInput.defaultProps = defaultProps

export default CreditCardNumberInput

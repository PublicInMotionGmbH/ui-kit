import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { AutoComplete, SelectBox } from '@talixo/combo-box'
import { TextInput } from '@talixo/text-input'
import { Icon } from '@talixo/icon'
import { DeviceSwap } from '@talixo/device-swap'

const moduleName = 'range-input'

const propTypes = {

  /** Minimum input value length. */
  minLength: PropTypes.number,

  /** Additional class name. */
  className: PropTypes.string,

  /** Minimum value. */
  min: PropTypes.number,

  /** Maximum value. */
  max: PropTypes.number,

  /** Callback for blur event. */
  onBlur: PropTypes.func,

  /** Callback for focus event. */
  onFocus: PropTypes.func,

  /** Callback for change event. */
  onChange: PropTypes.func,

  /** Passed value. */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),

  /** Input value length for auto complete. */
  autoCompleteLength: PropTypes.number,

  /** Should it render native select box on mobile? */
  mobileFriendly: PropTypes.number
}

const defaultProps = {
  minLength: 1,
  mobileFriendly: false
}

/**
 * Format value.
 *
 * @param {number} value
 * @param {number} minLength
 *
 * @returns {string}
 */
function formatValue (value, minLength) {
  if (value == null) {
    return ''
  }

  value = +value

  if (isNaN(value)) {
    return ''
  }

  value = value.toString()

  while (value.length < minLength) {
    value = '0' + value
  }

  return value
}

/**
 * Build end value.
 *
 * @param {string} value
 * @param {number} min
 * @param {number} max
 *
 * @returns {number}
 */
function buildEndValue (value, min, max) {
  if (value !== '0' && value !== 0 && !value) {
    return null
  }

  value = +value

  if (isNaN(value)) {
    return null
  }

  if (value > max) {
    return null
  }

  if (value < min) {
    return null
  }

  return value
}

/**
 * Create an array of numbers in desired range.
 *
 * @param {number} min
 * @param {number} max
 *
 * @returns {array}
 */
function range (min, max) {
  const arr = []

  for (let i = min; i <= max; i++) {
    arr.push(i)
  }

  return arr
}

/**
 * Component which represents expiration date input.
 *
 * @property {object} props
 * @property {number} [props.minLength]
 * @property {string} [props.className]
 * @property {number} [props.min]
 * @property {number} [props.max]
 * @property {func} [props.onBlur]
 * @property {func} [props.onFocus]
 * @property {func} [props.onChange]
 * @property {object} [props.value]
 * @property {number} [props.value.month]
 * @property {number} [props.value.year]
 * @property {number} [props.autoCompleteLength]
 *
 * @property {object} state
 * @property {object|null} state.inputValue
 * @property {object|null} state.value
 * @property {object|null} state.month
 * @property {object|null} state.year
 *
 * @class
 */
class RangeInput extends React.PureComponent {
  state = {
    inputValue: formatValue(this.props.value, this.props.minLength),
    value: this.props.value || null,
    focus: false,
    options: range(this.props.min, this.props.max)
  }

  componentWillReceiveProps (props) {
    if (props.value !== this.props.value && props.value !== undefined) {
      this.setState({
        value: props.value
      })
    }

    if (!this.state.focus && props.value !== undefined && (props.value !== this.state.inputValue || props.minLength !== this.props.minLength)) {
      this.setState({
        inputValue: formatValue(props.value, props.minLength)
      })
    }

    if (props.min !== this.props.min || props.max !== this.props.max) {
      this.setState({
        options: range(props.min, props.max)
      })
    }
  }

  /**
   * Handle input value change.
   *
   * @param {string} value
   */
  onInputValueChange = (value) => {
    // If passed value is the same as in current state, return.
    if (value === this.state.inputValue) {
      return
    }

    this.setState({ inputValue: value })
  }

  /**
   * Handle change.
   *
   * @param {string} value
   */
  onChange = (value) => {
    const { onChange } = this.props

    // Build value
    value = buildEndValue(value, this.props.min, this.props.max)

    if (this.props.value === undefined) {
      this.setState({
        value,
        inputValue: formatValue(value, this.props.minLength)
      })
    }

    if (onChange) {
      onChange(value)
    }

    if (this.node) {
      this.node.querySelector('input').blur()
    }
  }

  /**
   * Handle focus.
   *
   */
  focus = () => {
    const { onFocus } = this.props

    this.setState({
      focus: true
    })

    if (onFocus) {
      onFocus()
    }
  }

  /**
   * Handle blur.
   *
   */
  blur = () => {
    const { autoCompleteLength, onBlur, onChange } = this.props
    const { inputValue } = this.state

    const state = { focus: false }

    if (onBlur) {
      onBlur()
    }

    let value = buildEndValue(inputValue, this.props.min, this.props.max)

    if (value === null && autoCompleteLength && autoCompleteLength <= inputValue.length) {
      const options = this.state.options.filter(x => `${x}`.substr(-inputValue.length) === inputValue)

      if (options.length === 1) {
        value = options[0]
      }
    }

    if (inputValue) {
      state.inputValue = formatValue(value, this.props.minLength)
    }

    this.setState(state)

    if (this.props.value === undefined) {
      this.setState({ value })
    }

    if (this.props.value === value) {
      return
    }

    if (onChange) {
      onChange(value)
    }
  }

  /**
   * Handle key down.
   *
   * @param {SyntheticEvent} event
   */
  onKeyDown = (event) => {
    const charCode = event.which || event.keyCode

    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 37 || charCode > 40)) {
      event.preventDefault()
    }
  }

  /**
  * Save base node element.
  *
  * @param {Element} node
  */
  saveRef = (node) => {
    this.node = node
  }

  renderComboBox = () => {
    const {
      minLength, className, min, max, onBlur, onFocus, onChange,
      value: _value, mobileFriendly, autoCompleteLength, ...passedProps
    } = this.props
    const { focus, options, value, inputValue } = this.state

    // Build icon.
    const icon = this.state.focus
      ? <Icon name='keyboard_arrow_up' />
      : <Icon name='keyboard_arrow_down' />

    return (
      <AutoComplete
        options={options}
        isOpen={focus}
        renderItem={(item) => formatValue(item, minLength)}
        value={value}
        inputValue={inputValue}
        onInputValueChange={this.onInputValueChange}
        onChange={this.onChange}
        onFocus={this.focus}
        onBlur={this.blur}
        itemToString={x => x == null ? '' : formatValue(x, minLength)}
      >
        <TextInput
          onKeyDown={this.onKeyDown}
          pattern='[0-9]*'
          inputMode='numeric'
          right={icon}
          maxLength={Math.max(('' + max).length, minLength)}
          {...passedProps}
        />
      </AutoComplete>
    )
  }

  renderSelectBox = () => {
    const {
      minLength, className, min, max, onBlur, onFocus, onChange,
      value: _value, autoCompleteLength, mobileFriendly, ...passedProps
    } = this.props
    const { focus, options, value } = this.state

    return (
      <SelectBox
        {...passedProps}
        mobileFriendly
        options={options}
        isOpen={focus}
        renderItem={item => formatValue(item, minLength)}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    )
  }

  /**
   * Render range input component.
   *
   * @returns {React.Element}
   */
  render () {
    const { className, mobileFriendly } = this.props
    const { focus } = this.state

    // Build class names.
    const wrapperClsName = buildClassName(moduleName, className, {
      focused: focus
    })

    const inner = mobileFriendly ? (
      <DeviceSwap
        defaultView='mobile'
        renderMobile={this.renderSelectBox}
        renderDesktop={this.renderComboBox}
      />
    ) : this.renderComboBox()

    return (
      <div className={wrapperClsName} ref={this.saveRef}>
        {inner}
      </div>
    )
  }
}

RangeInput.propTypes = propTypes

RangeInput.defaultProps = defaultProps

export default RangeInput

import React from 'react'
import PropTypes from 'prop-types'

import { TextInput } from '@talixo/text-input'

import { buildClassName } from '@talixo/shared'

import { ALLOWED_KEYS } from './config'

const moduleName = 'cvc-input'

const propTypes = {
  /** Additional class name passed to input. */
  className: PropTypes.string,

  /** Handler for onBlur event. */
  onBlur: PropTypes.func,

  /** Handler for onChange event. */
  onChange: PropTypes.func,

  /** Handler for onFocus event. */
  onFocus: PropTypes.func,

  /** Value to be displayed inside input. */
  value: PropTypes.string
}

const defaultProps = {}

/**
 * Component which represents cvc input.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {func} [props.onBlur]
 * @property {func} [props.onChange]
 * @property {func} [props.onFocus]
 * @property {string} [props.value]
 *
 * @property {object} state
 * @property {string|null} state.value
 *
 * @class
 */
class CvcInput extends React.PureComponent {
  state = {
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
   * Handle change on text input.
   *
   * @param {string} value
   */
  change = (value) => {
    const { onChange } = this.props

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
   * Handle key down.
   *
   * @param {SyntheticEvent} event
   */
  onKeyDown = (event) => {
    const charCode = event.which || event.keyCode

    // Check if key is allowed.
    if (!(ALLOWED_KEYS.indexOf(charCode) > -1)) {
      event.preventDefault()
    }
  }

  /**
   * Render credit card input component.
   *
   * @returns {React.Element}
   */
  render () {
    const { className, value, onChange, onFocus, onBlur, ...passedProps } = this.props

    // Build class name
    const clsName = buildClassName(moduleName, className)

    return (
      <TextInput
        className={clsName}
        autoComplete='cc-csc'
        maxLength={4}
        onChange={this.change}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={this.onKeyDown}
        size={4}
        value={this.state.value}
        {...passedProps}
      />
    )
  }
}

CvcInput.propTypes = propTypes

CvcInput.defaultProps = defaultProps

export default CvcInput

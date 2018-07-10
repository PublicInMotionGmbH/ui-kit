import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import FormRow from './FormRow'

export const moduleName = 'field'

const propTypes = {
  /** Additional class name. */
  className: PropTypes.string,

  /** Displayed error message. */
  error: PropTypes.node,

  /** Displayed hint message. */
  hint: PropTypes.node,

  /** Id for input. */
  id: PropTypes.string,

  /** Label for input. */
  label: PropTypes.node,

  /** Should position elements horizontally? */
  horizontal: PropTypes.bool,

  /** Only for 'horizontal': should spread input when there is no hint? */
  spread: PropTypes.bool,

  /** Event called after input has lost focus. */
  onBlur: PropTypes.func,

  /** Event called after input has been changed. */
  onChange: PropTypes.func,

  /** Event called after input has gained focus. */
  onFocus: PropTypes.func,

  /** Displayed warning message. */
  warning: PropTypes.node,

  /** Value passed to input. */
  value: PropTypes.any,

  /** Error message transformer. May be i.e. translation function */
  formatErrorMessage: PropTypes.func
}

const defaultProps = {
}

// Set initial counter.
let counter = 1

/**
 * Generate unique id.
 *
 * @returns {number}
 */
function generateUid () {
  return counter++
}

/**
 * Reset id for testing purposes.
 *
 * @returns {number}
 */
export function resetIdCounter () {
  counter = 1
}

/**
 * Component which represents form field.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {*} [props.error]
 * @property {*} [props.hint]
 * @property {string} [props.id]
 * @property {*} [props.label]
 * @property {function} [props.formatErrorMessage]
 * @property {function} [props.onBlur]
 * @property {function} [props.onChange]
 * @property {function} [props.onFocus]
 * @property {*} [props.warning]
 *
 * @property {object} state
 * @property {boolean} state.focus
 *
 * @class {React.Element}
 */
class Field extends React.Component {
  uniqueId = `form_field_${generateUid().toString(36)}`
  state = {
    focus: false
  }

  /**
   * Handle input blur.
   */
  handleBlur = (...args) => {
    const { onBlur } = this.props
    this.changeFocus(args, onBlur, false)
  }

  /**
   * Handle input focus.
   */
  handleFocus = (...args) => {
    const { onFocus } = this.props
    this.changeFocus(args, onFocus, true)
  }

  /**
   * Handle focus change.
   *
   * @param {array} args
   * @param {function} eventHandler
   * @param {boolean} focus
   */
  changeFocus (args, eventHandler, focus) {
    this.setState({ focus })

    if (eventHandler) {
      eventHandler(...args)
    }
  }

  /**
   * Build label for form field.
   *
   * @param {string} uniqueId
   *
   * @returns {React.Element}
   */
  buildLabel (uniqueId) {
    const { label } = this.props

    // Build class names for label
    const labelClsName = buildClassName([ moduleName, 'label' ])

    // Build label
    return (
      <div className={labelClsName}>
        <label htmlFor={uniqueId}>{label}</label>
      </div>
    )
  }

  /**
   * Build message for form field.
   *
   * @param {node} message
   * @param {string} typeName
   *
   * @returns {React.Element}
   */
  buildMessage (message, typeName) {
    const { formatErrorMessage, horizontal, spread } = this.props
    const format = formatErrorMessage || (x => x)

    // Build class names for label
    const messageClsName = buildClassName([ moduleName, 'message' ], null, [ typeName ])

    // Use message formatter for warning & error messages
    message = format(message)

    // Build label
    return (
      <FormRow className={messageClsName} horizontal={horizontal} spread={spread}>
        {message}
      </FormRow>
    )
  }

  /**
   * Build input.
   *
   * @param {string} uniqueId
   * @returns {React.Element}
   */
  buildInput (uniqueId) {
    const { error, onChange, children, value } = this.props

    const input = React.Children.only(children)

    return React.cloneElement(input, {
      error: error != null,
      id: uniqueId,
      onBlur: this.handleBlur,
      onChange: onChange,
      onFocus: this.handleFocus,
      value: value
    })
  }

  render () {
    const {
      children, className, error, hint, onBlur, onChange, onFocus, horizontal, spread,
      id, label, warning, formatErrorMessage, value, ...passedProps
    } = this.props
    const { focus } = this.state

    const modifiers = {
      hint: hint != null,
      horizontal,
      focus,
      spread
    }

    // Build class names
    const fieldClsName = buildClassName(moduleName, className, modifiers)
    const inputWrapperClsName = buildClassName([ moduleName, 'input' ])
    const messagesClsName = buildClassName([ moduleName, 'messages' ])
    const shallowLabelClsName = buildClassName([ moduleName, 'shallow-label' ])

    // Build unique ID if id is not provided.
    const uniqueId = id || this.uniqueId

    // Build input for passing props
    const input = this.buildInput(uniqueId)

    const labelElement = label != null ? <label htmlFor={uniqueId}>{label}</label> : null
    const errorElement = error != null ? this.buildMessage(error, 'error') : null
    const warningElement = warning != null ? this.buildMessage(warning, 'warning') : null

    return (
      <div className={fieldClsName} {...passedProps}>
        <FormRow start={labelElement} end={hint} horizontal={horizontal} spread={spread}>
          <div className={shallowLabelClsName}>{labelElement}</div>
          <div className={inputWrapperClsName}>
            {input}
          </div>
        </FormRow>
        <div className={messagesClsName}>
          {errorElement}
          {warningElement}
        </div>
      </div>
    )
  }
}

Field.propTypes = propTypes
Field.defaultProps = defaultProps

export default Field

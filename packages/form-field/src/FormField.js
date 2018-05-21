import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

export const moduleName = 'form-field'

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

  /** Event called after input has lost focus. */
  onBlur: PropTypes.func,

  /** Event called after input has been changed. */
  onChange: PropTypes.func,

  /** Event called after input has gained focus. */
  onFocus: PropTypes.func,

  /** Displayed warning message. */
  warning: PropTypes.node,

  /** Value passed to input. */
  value: PropTypes.any
}

const defaultProps = {}

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
class FormField extends React.Component {
  state = {
    focus: false
  }

  /**
   * Handle input blur.
   *
   * @param {SyntheticEvent} e
   */
  handleBlur = (e) => {
    const { onBlur } = this.props
    this.changeFocus(e, onBlur, false)
  }

  /**
   * Handle input focus.
   *
   * @param {SyntheticEvent} e
   */
  handleFocus = (e) => {
    const { onFocus } = this.props
    this.changeFocus(e, onFocus, true)
  }

  /**
   * Handle focus change.
   *
   * @param {SyntheticEvent} e
   * @param {function} eventHandler
   * @param {boolean} focus
   */
  changeFocus = (e, eventHandler, focus) => {
    this.setState({ focus })

    if (eventHandler) {
      eventHandler(e)
    }
  }

  /**
   * Build label for form field.
   *
   * @param {string} uniqueId
   *
   * @returns {React.Element}
   */
  buildLabel = (uniqueId) => {
    const { label } = this.props
    // Build class names for label
    const labelClsName = buildClassName([ moduleName, 'label' ])

    // Build label
    return (
      <div className={labelClsName} >
        <label htmlFor={uniqueId}>{label}</label>
      </div>
    )
  }

  /**
   * Build message for form field.
   *
   * @param {node} type
   * @param {string} typeName
   *
   * @returns {React.Element}
   */
  buildMessage = (type, typeName) => {
    const { label } = this.props
    // Build class names for label
    const typeClsName = buildClassName([ moduleName, typeName ], null, { labeled: label != null })

    // Build label
    return <div className={typeClsName}>{type}</div>
  }

  /**
   * Build input.
   *
   * @param {string} uniqueId
   *
   * @returns {React.Element}
   */
  buildInput = (uniqueId) => {
    const { error, onChange, children, value } = this.props
    const { handleBlur, handleFocus } = this
    /**
     * Build class names for input.
     *
     * @returns {string}
     */
    const buildInputClsName = (child) => {
      return 'className' in child.props
        ? buildClassName([ moduleName, 'input' ], child.props.className)
        : buildClassName([ moduleName, 'input' ])
    }

    /**
     * Build properties passed to input.
     *
     * @param {node} child
     *
     * @returns {object}
     */
    const buildPassedProps = (child) => ({
      className: buildInputClsName(child),
      error: error != null,
      id: uniqueId,
      onBlur: handleBlur,
      onChange: onChange,
      onFocus: handleFocus,
      value: value
    })

    // Build input with passed props
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, buildPassedProps(child))
    })
  }

  render () {
    const { children, className, error, hint, onBlur, onChange, onFocus, id, label, warning, ...passedProps } = this.props
    const { focus } = this.state
    const { buildInput, buildLabel, buildMessage } = this

    // Build class names
    const fieldClsName = buildClassName(moduleName, className, { focus: focus, blur: !focus })
    const inputWrapperClsName = buildClassName([moduleName, 'input-wrapper'])

    // Build uniquId if id is not provided.
    const uniqueId = id || `form_field_${generateUid().toString(36)}`

    // Build input for passing props
    const input = React.Children.only(children) && buildInput(uniqueId)

    return (
      <div className={fieldClsName} {...passedProps}>
        {label && buildLabel(uniqueId)}
        <div className={inputWrapperClsName}>
          {input}
          {hint && buildMessage(hint, 'hint')}
        </div>
        {error && buildMessage(error, 'error')}
        {warning && buildMessage(warning, 'warning')}
      </div>
    )
  }
}

FormField.propTypes = propTypes

FormField.defaultProps = defaultProps

export default FormField

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

  /** Event called after input value has lost focus. */
  onBlur: PropTypes.func,

  /** Event called after input value has been changed. */
  onChange: PropTypes.func,

  /** Event called after input value has gained focus. */
  onFocus: PropTypes.func,

  /** Displayed warning message. */
  warning: PropTypes.node
}

const defaultProps = {}

// Set initial counter.
let counter = 1

/**
 * Generate unique id.
 *
 * @returns {string}
 */
function generateUid () {
  return counter++
}

/**
 * Reset id for testing purposes.
 *
 * @returns {string}
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
    this.setState({ focus: false })

    if (onBlur) {
      onBlur(e)
    }
  }

  /**
   * Handle input focus.
   *
   * @param {SyntheticEvent} e
   */
  handleFocus = (e) => {
    const { onFocus } = this.props
    this.setState({ focus: true })

    if (onFocus) {
      onFocus(e)
    }
  }

  /**
   * Build label for form field.
   *
   * @returns {React.Element}
   */
  buildLabel = (uniqueId) => {
    const { label } = this.props
    // Build class names for label
    const labelClsName = buildClassName([ moduleName, 'label' ])

    // Build label
    return label ? <label className={labelClsName} htmlFor={uniqueId}>{label}</label> : null
  }

  /**
   * Build message for form field.
   *
   * @returns {React.Element}
   */
  buildMessage (type, typeName) {
    // Build class names for label
    const typeClsName = buildClassName([ moduleName, typeName ])

    // Build label
    return type ? <div className={typeClsName}>{type}</div> : null
  }

  /**
   * Build input.
   *
   * @returns {React.Element}
   */
  buildInput = (uniqueId) => {
    const { error, onChange, children } = this.props
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
     * @returns {object}
     */
    const buildPassedProps = (child) => ({
      className: buildInputClsName(child),
      error: error !== undefined,
      id: uniqueId,
      onBlur: handleBlur,
      onChange: onChange,
      onFocus: handleFocus
    })

    // Build input with passed props
    return React.Children.only(children) && (
      React.Children.map(children, (child) => {
        return React.cloneElement(child, buildPassedProps(child))
      })
    )
  }

  render () {
    const { children, className, error, hint, onBlur, onChange, onFocus, id, label, warning, ...passedProps } = this.props
    const { focus } = this.state
    const { buildInput, buildLabel, buildMessage } = this

    // Build uniquId if id is not provided.
    const uniqueId = id || `form_field_${generateUid().toString(36)}`

    // Build input for passing props
    const input = buildInput(uniqueId)

    return (
      <div className={buildClassName(moduleName, className, { focus: focus, blur: !focus })} {...passedProps}>
        {buildLabel(uniqueId)}
        <div className={buildClassName([moduleName, 'input-wrapper'])}>
          {input}
          {buildMessage(error, 'error')}
          {buildMessage(warning, 'warning')}
        </div>
        {buildMessage(hint, 'hint')}
      </div>
    )
  }
}

FormField.propTypes = propTypes

FormField.defaultProps = defaultProps

export default FormField

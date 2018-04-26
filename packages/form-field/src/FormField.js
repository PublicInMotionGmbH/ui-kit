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

  /** Event called after input value has been changed. */
  onChange: PropTypes.func,

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
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.error]
 * @param {*} [props.hint]
 * @param {string} [props.id]
 * @param {*} [props.label]
 * @param {function} [props.onChange]
 * @param {*} [props.warning]
 * @returns {React.Element}
 */
function FormField (props) {
  const { children, className, error, hint, onChange, id, label, warning, ...passedProps } = props

  // Build uniquId if id is not provided.
  const uniqueId = id || `form_field_${generateUid().toString(36)}`

  /**
   * Build label for form field.
   *
   * @returns {React.Element}
   */
  function buildLabel () {
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
  function buildMessage (type, typeName) {
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
  function buildInput () {
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
      onChange: onChange
    })

    // Build input with passed props
    return React.Children.only(children) && (
      React.Children.map(children, (child) => {
        return React.cloneElement(child, buildPassedProps(child))
      })
    )
  }

  // Build input for passing props
  const input = buildInput()

  return (
    <div className={buildClassName(moduleName, className)} {...passedProps}>
      {buildLabel()}
      <div className={buildClassName([moduleName, 'input-wrapper'])}>
        {input}
        {buildMessage(error, 'error')}
        {buildMessage(warning, 'warning')}
      </div>
      {buildMessage(hint, 'hint')}
    </div>
  )
}

FormField.propTypes = propTypes

FormField.defaultProps = defaultProps

export default FormField

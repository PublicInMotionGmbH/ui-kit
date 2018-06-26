import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Radio button description.  */
  children: PropTypes.node,

  /** Additional wrapper class name. */
  className: PropTypes.string,

  /** Indicates if option should be disabled. */
  disabled: PropTypes.bool,

  /** Has radio input error? */
  error: PropTypes.bool,

  /** onChange callback. */
  onChange: PropTypes.func,

  /** Styles passed to radio button wrapper. */
  style: PropTypes.object
}

const defaultProps = {
  error: false,
  disabled: false
}

/**
 * Component which represents Radio Input.
 *
 * @param {object} props
 * @param {*} [props.children]
 * @param {string} [props.className]
 * @param {boolean} [props.disabled]
 * @param {boolean} [props.error]
 * @param {function} [props.onChange]
 * @param {object} [props.style]
 *
 * @returns {React.Element}
 */
function RadioInput (props) {
  const { children, className, disabled, error, onChange, style, ...passedProps } = props

  const wrapperClass = buildClassName('radio-input', className, { disabled, error })
  const inputClass = buildClassName(['radio-input', 'input'])

  const handleOnChange = e => {
    if (onChange) { onChange(e.target.checked, e) }
  }

  return (
    <label className={wrapperClass} style={style}>
      <input
        className={inputClass}
        disabled={disabled}
        type='radio'
        onChange={handleOnChange}
        {...passedProps}
      />
      <span>{children}</span>
    </label>
  )
}

RadioInput.propTypes = propTypes

RadioInput.defaultProps = defaultProps

export default RadioInput

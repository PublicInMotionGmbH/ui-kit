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

  /** Radio input label size ('small', 'large'). */
  size: PropTypes.oneOf([ 'small', 'large' ]),

  /** Styles passed to radio button wrapper. */
  style: PropTypes.object
}

const defaultProps = {
  disabled: false
}

/**
 * Component which represents Radio Input.
 *
 * @param {object} props
 * @param {*} [props.children]
 * @param {string} [props.className]
 * @param {string} [props.size]
 * @param {object} [props.style]
 * @returns {React.Element}
 */
function RadioInput (props) {
  const { children, className, disabled, size, style, onChange, ...passedProps } = props

  const wrapperClass = buildClassName('radio-input', className, [ size ], { disabled })
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

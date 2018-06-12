import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Radio button description  */
  children: PropTypes.node,

  /** Additional wrapper class name */
  className: PropTypes.string,

  /** Has radio input error? */
  error: PropTypes.bool,

  /** Styles passed to radio button wrapper */
  style: PropTypes.object
}

const defaultProps = {
  error: false
}

/**
 * Component which represents Radio Input.
 *
 * @param {object} props
 * @param {*} [props.children]
 * @param {string} [props.className]
 * @param {boolean} [props.error]
 * @param {object} [props.style]
 * @returns {React.Element}
 */
function RadioInput (props) {
  const { children, className, error, style, onChange, ...passedProps } = props

  const wrapperClass = buildClassName('radio-input', className, { error })

  const handleOnChange = e => {
    if (onChange) { onChange(e.target.checked) }
  }

  return (
    <label className={wrapperClass} style={style}>
      <input type='radio' onChange={handleOnChange} {...passedProps} />
      <span>{children}</span>
    </label>
  )
}

RadioInput.propTypes = propTypes
RadioInput.defaultProps = defaultProps

export default RadioInput

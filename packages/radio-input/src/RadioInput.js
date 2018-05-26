import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

/**
 * Component which represents Radio Input.
 *
 * @param {object} props
 * @param {node} [props.children]
 * @param {string} [props.className]
 * @param {string} [props.size]
 * @param {object} [props.style]
 * @returns {React.Element}
 */
function RadioInput (props) {
  const { children, className, size, style, onChange, ...passedProps } = props

  const wrapperClass = buildClassName('radio-input', className, [ size ])

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

RadioInput.propTypes = {
  /** Radio button description  */
  children: PropTypes.node,

  /** Additional wrapper class name */
  className: PropTypes.string,

  /** Radio input label size ('small', 'large') */
  size: PropTypes.oneOf([ 'small', 'large' ]),

  /** Styles passed to radio button wrapper */
  style: PropTypes.object
}

export default RadioInput

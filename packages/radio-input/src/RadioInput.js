import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

/**
 * Component which represents Radio Input.
 *
 * @param {object} props
 * @param {node} [props.children]
 * @param {string} [props.className]
 * @param {object} [props.style]
 * @returns {React.Element}
 */
function RadioInput (props) {
  const { children, className, style, ...passedProps } = props

  const wrapperClass = buildClassName('radio-input', className)

  return (
    <label className={wrapperClass} style={style}>
      <input type='radio' {...passedProps} />
      <span>{children}</span>
    </label>
  )
}

RadioInput.propTypes = {
  /** Radio button description  */
  children: PropTypes.node,

  /** Additional wrapper class name */
  className: PropTypes.string,

  /** Styles passed to radio button wrapper */
  style: PropTypes.object
}

export default RadioInput

import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

const defaultProps = {
  /**  */
  resize: true
}
/**
 * Component which represents Textarea.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function Textarea (props) {
  const { className, disabled, maxLength, resize, placeholder, ...passedProps } = props

  return (
    <textarea
      className={buildClassName('textarea', className, [resize ? null : 'no-resize'])}
      maxlength={maxLength} {...passedProps}
      disabled={disabled}
      placeholder={placeholder}
    />
  )
}

Textarea.propTypes = propTypes
Textarea.defaultProps = defaultProps

export default Textarea

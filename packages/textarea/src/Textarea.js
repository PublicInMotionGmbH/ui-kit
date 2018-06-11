import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Disabled textarea */
  disabled: PropTypes.bool,

  /** Placeholder */
  placeholder: PropTypes.string,

  /** Resize textarea */
  resize: PropTypes.bool,

  /** Max length */
  maxLength: PropTypes.number,

  /** Textarea or TextareaAutosize */
  TextareaComponent: PropTypes.oneOf(['textarea', PropTypes.node])
}

const defaultProps = {
  TextareaComponent: 'textarea',
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
  const { className, disabled, placeholder, resize, maxLength, minRows, TextareaComponent, ...passedProps } = props

  return (
    <TextareaComponent
      className={buildClassName('textarea', className, [resize ? null : 'no-resize', disabled ? 'disabled' : null])}
      maxLength={maxLength}
      disabled={disabled}
      placeholder={placeholder}
      {...passedProps}
    />
  )
}

Textarea.propTypes = propTypes
Textarea.defaultProps = defaultProps

export default Textarea

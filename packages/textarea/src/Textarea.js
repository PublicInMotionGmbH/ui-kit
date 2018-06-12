import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Disabled textarea */
  disabled: PropTypes.bool,

  /** Max length */
  maxLength: PropTypes.number,

  /** Placeholder for textarea */
  placeholder: PropTypes.string,

  /** Resize textarea */
  resize: PropTypes.bool,

  /** Textarea or TextareaAutosize */
  TextareaComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
}

const defaultProps = {
  resize: true,
  TextareaComponent: 'textarea'
}
/**
 * Component which represents Textarea.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {bool} [props.disabled]
 * @param {number} [props.maxLength]
 * @param {string} [props.placeholder]
 * @param {bool} [props.resize]
 * @param {string|node} [props.TextareaComponent]
 * @returns {React.Element}
 */
function Textarea (props) {
  const { className, disabled, maxLength, placeholder, resize, TextareaComponent, ...passedProps } = props

  return (
    <TextareaComponent
      className={buildClassName('textarea', className, [resize ? null : 'no-resize', disabled ? 'disabled' : null])}
      disabled={disabled}
      maxLength={maxLength}
      placeholder={placeholder}
      {...passedProps}
    />
  )
}

Textarea.propTypes = propTypes
Textarea.defaultProps = defaultProps

export default Textarea

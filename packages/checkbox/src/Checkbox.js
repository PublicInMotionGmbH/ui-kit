import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

export const moduleName = 'checkbox'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Checkbox description */
  children: PropTypes.node,

  /** Indicates that input has error */
  error: PropTypes.bool,

  /** Checkbox label size ('small', 'large') */
  size: PropTypes.oneOf([ 'small', 'large' ]),

  /** Additional styles for wrapper */
  style: PropTypes.object
}

const defaultProps = {
  error: false
}

/**
 * Component which represents checkbox.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {boolean} [props.error]
 * @param {function} [props.onChange]
 * @param {node} [props.children]
 * @param {string} [props.size]
 * @param {object} [props.style]
 * @returns {React.Element}
 */
function Checkbox (props) {
  const { children, className, error, onChange, size, style, ...passedProps } = props

  /**
   * Handle input change
   *
   * @param {object} event
   */
  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.checked)
    }
  }

  const clsName = buildClassName(moduleName, className, {error, [size]: size})

  return (
    <label className={clsName} style={style}>
      <input
        type='checkbox'
        onChange={event => handleChange(event)}
        {...passedProps}
      />
      <span>{children}</span>
    </label>
  )
}

Checkbox.propTypes = propTypes

Checkbox.defaultProps = defaultProps

export default Checkbox

import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/commons'

const clsName = prefix('checkbox')

/**
 * Component which represents checkbox.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {node} [props.children]
 * @param {string} [props.size]
 * @param {object} [props.style]
 * @returns {React.Element}
 */
const Checkbox = ({ children, className, size, style, ...props }) => (
  <label
    className={cls(clsName, className, {
      [prefix(`checkbox--${size}`)]: size !== undefined
    })}
    style={style}
  >
    <input type='checkbox' {...props} />
    <span>{children}</span>
  </label>
)

Checkbox.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Checkbox description */
  children: PropTypes.node,

  /** Checkbox label size ('small', 'large') */
  size: PropTypes.string,

  /** Additional styles */
  style: PropTypes.object
}

Checkbox.defaultProps = {
}

export default Checkbox

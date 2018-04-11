import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

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
function Checkbox (props) {
  const { children, className, size, style, ...passedProps } = props

  const clsName = buildClassName('checkbox', className, [ size ])

  return (
    <label className={clsName} style={style}>
      <input type='checkbox' {...passedProps} />
      <span>{children}</span>
    </label>
  )
}

Checkbox.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Checkbox description */
  children: PropTypes.node,

  /** Checkbox label size ('small', 'large') */
  size: PropTypes.oneOf([ 'small', 'large' ]),

  /** Additional styles for wrapper */
  style: PropTypes.object
}

export default Checkbox

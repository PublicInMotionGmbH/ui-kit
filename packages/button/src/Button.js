import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

/**
 * Component which represents button.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.color]
 * @param {*} [props.size]
 * @param {*} [props.variant]
 * @returns {React.Element}
 */
function Button (props) {
  const { children, className, color, size, variant, ...passedProps } = props

  const clsName = buildClassName('button', className, [ color, size, variant ])

  return (
    <button className={clsName} {...passedProps}>
      {children}
    </button>
  )
}

Button.propTypes = {
  /** All nodes inside button */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Button color */
  color: PropTypes.string,

  /** Button size */
  size: PropTypes.string,

  /** Button variant */
  variant: PropTypes.string
}

Button.defaultProps = {
  disabled: false
}

export default Button
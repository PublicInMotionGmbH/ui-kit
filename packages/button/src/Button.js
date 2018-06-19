import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** All nodes inside button */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Should this button have `submit` type? */
  submit: PropTypes.bool,

  /** Button styling type */
  type: PropTypes.oneOf([ 'link', 'primary', 'secondary', 'tertiary', 'success', 'info', 'warning', 'error' ]),

  /** Is this button a ghost-button (with transparent background)? */
  ghost: PropTypes.bool,

  /** Should this button be small? */
  small: PropTypes.bool,

  /** Should use full 100% width? */
  fluid: PropTypes.bool
}

const defaultProps = {
  ghost: false,
  small: false,
  fluid: false
}

/**
 * Component which represents button.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.type]
 * @param {*} [props.size]
 * @returns {React.Element}
 */
function Button (props) {
  const { children, className, type, small, fluid, submit, ghost, ...passedProps } = props

  const clsName = buildClassName('button', className, [ type ], { ghost, small, fluid })

  return (
    <button className={clsName} type={submit ? 'submit' : 'button'} {...passedProps}>
      {children}
    </button>
  )
}

Button.propTypes = propTypes
Button.defaultProps = defaultProps

export default Button

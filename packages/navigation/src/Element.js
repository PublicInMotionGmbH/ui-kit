import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

/**
 * Component which represents Element.
 *
 * @param {object} props
 * @param {boolean} [props.active]
 * @param {*} [props.children]
 * @param {string} [props.className]
 * @param {boolean} [props.disabled]
 * @param {function} [props.onClick]
 * @param {string} [props.type]
 * @returns {React.Element}
 */
function Element (props) {
  const { active, children, className, disabled, onClick, type, typeClassName, ...passedProps } = props

  // Build element class name
  const classNames = buildClassName([ 'navigation', 'element' ], className, { active, disabled })

  return (
    <li className={classNames} onClick={onClick} {...passedProps}>
      {children}
    </li>
  )
}

Element.propTypes = {
  /** Active state */
  active: PropTypes.bool,

  /** Element items */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Disabled state */
  disabled: PropTypes.bool,

  /** Function passed to element */
  onClick: PropTypes.func
}

Element.defaultProps = {
  active: false,
  disabled: false
}

export default Element

import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

export const moduleName = 'navigation'

const propTypes = {
  /** Active state */
  active: PropTypes.bool,

  /** Element items */
  children: PropTypes.node,

  /** Completed state */
  completed: PropTypes.bool,

  /** Additional class name */
  className: PropTypes.string,

  /** Disabled state */
  disabled: PropTypes.bool,

  /** Function passed to element */
  onClick: PropTypes.func
}

const defaultProps = {
  active: false,
  disabled: false
}

/**
 * Component which represents Element.
 *
 * @param {object} props
 * @param {boolean} [props.active]
 * @param {*} [props.children]
 * @param {boolean} [props.completed]
 * @param {string} [props.className]
 * @param {boolean} [props.disabled]
 * @param {function} [props.onClick]
 * @returns {React.Element}
 */
function Element (props) {
  const { active, children, completed, className, disabled, onClick, ...passedProps } = props

  // Build element class name
  const classNames = buildClassName([ moduleName, 'element' ], className, { active, completed, disabled })

  return (
    <li className={classNames} onClick={onClick} {...passedProps}>
      {children}
    </li>
  )
}

Element.displayName = 'Element'

Element.propTypes = propTypes

Element.defaultProps = defaultProps

export default Element

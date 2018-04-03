import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import { prefix } from '@talixo/shared'

const moduleName = prefix('navigation')

/**
 * Component which represents Element.
 *
 * @param {object} props
 * @param {boolean} [props.active]
 * @param {*} [props.children]
 * @param {string} [props.className]
 * @param {boolean} [props.disabled]
 * @param {*} [props.divider]
 * @param {function} [props.onClick]
 * @param {string} [props.type]
 * @returns {React.Element}
 */
function Element (props) {
  const { active, children, className, disabled, divider, onClick, type, ...passedProps } = props
  const classNames = cls(className, `${moduleName}--${type}--element`, {
    [`${moduleName}--${type}--element--active`]: active,
    [`${moduleName}--${type}--element--disabled`]: disabled
  })

  return (
    <li className={classNames} onClick={onClick} {...passedProps}>
      {children}
      {!divider
        ? null
        : <div className={`${moduleName}--divider`}>{divider}</div>
      }
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

  /** Divider */
  divider: PropTypes.node,

  /** Function passed to element */
  onClick: PropTypes.func,

  /** Type of navigation */
  type: PropTypes.oneOf(['navigation', 'pagination', 'breadcrumbs', 'tabs'])
}

Element.defaultProps = {
  active: false,
  disabled: false,
  type: 'navigation'
}

export default Element

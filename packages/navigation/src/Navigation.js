import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/shared'

const moduleName = prefix('navigation')

/**
 * Component which represents Navigation.
 *
 * @param {object} props
 * @param {*} [props.children]
 * @param {string} [props.className]
 * @param {*} [props.divider]
 * @param {string} [props.type]
 * @returns {React.Element}
 */
function Navigation (props) {
  const { children, className, divider, type, ...passedProps } = props

  /**
   * Method that return object with passed props.
   *
   * @param {array} children
   * @param {number} i
   * @returns {object}
   */
  const buildChildProps = (children, i) => {
    const typeClassName = `${moduleName}_element--${type}`
    const newProps = { typeClassName }

    if (type === 'breadcrumbs') {
      return { ...newProps, divider: children.length <= 1 ? divider : i > children.length - 2 ? null : divider }
    }

    return newProps
  }

  const mappedChildren = React.Children.map(children, (child, i) => {
    return React.cloneElement(child, buildChildProps(children, i))
  })

  return (
    <ul className={cls(className, moduleName, `${moduleName}--${type}`)} {...passedProps}>
      {mappedChildren}
    </ul>
  )
}

Navigation.propTypes = {
  /** Navigation items */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Divider */
  divider: PropTypes.node,

  /** Type of navigation */
  type: PropTypes.oneOf(['navigation', 'pagination', 'breadcrumbs', 'tabs'])
}

Navigation.defaultProps = {
  divider: '/',
  type: 'navigation'
}

export default Navigation

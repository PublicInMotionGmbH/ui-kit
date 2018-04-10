import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import _ from 'lodash'

import { prefix } from '@talixo/shared'

const moduleName = prefix('navigation')

/**
* Method that inserts divider between children.
*
* @param {*} children
* @param {*} divider
* @returns {array}
*/
const childrenWithDividers = (children, divider) => {
  const arrayOfChildren = React.Children.toArray(children)

  /**
  * Method that inserts element between array of elements.
  *
  * @param {*} value
  * @param {number} index
  * @param {array} array
  * @returns {*}
  */
  const insertDivider = (value, index, array) => {
    const dividerElement = (<div key={`divider--${index}`} className={`${moduleName}--divider`}>{divider}</div>)

    return array.length - 1 !== index
      ? [value, dividerElement]
      : value
  }

  return _.flatMap(arrayOfChildren, insertDivider)
}

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
   * @returns {object}
   */
  const buildChildProps = children => {
    const typeClassName = `${moduleName}_element--${type}`
    return { typeClassName }
  }

  const childrenWithBuiltProps = React.Children.map(children, (child, i) => {
    return React.cloneElement(child, buildChildProps(children))
  })

  const mappedChildren = type === 'breadcrumbs' ? childrenWithDividers(childrenWithBuiltProps, divider) : childrenWithBuiltProps

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

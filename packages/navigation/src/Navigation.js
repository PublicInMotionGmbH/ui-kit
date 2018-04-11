import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { prefix, buildClassName } from '@talixo/shared'

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
    const dividerElement = (<div key={`divider--${index}`} className={prefix('navigation', 'divider')}>{divider}</div>)

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
  const buildChildProps = children => ({
    typeClassName: buildClassName([ 'navigation', 'element' ], null, type)
  })

  const childrenWithBuiltProps = React.Children.map(children, (child, i) => {
    return React.cloneElement(child, buildChildProps(children))
  })

  const mappedChildren = type === 'breadcrumbs' ? childrenWithDividers(childrenWithBuiltProps, divider) : childrenWithBuiltProps

  const clsName = buildClassName('navigation', className, type)

  return (
    <ul className={clsName} {...passedProps}>
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

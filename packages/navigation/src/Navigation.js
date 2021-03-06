import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { buildClassName } from '@talixo/shared'

export const moduleName = 'navigation'

const propTypes = {
  /** Navigation items */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Divider */
  divider: PropTypes.node,

  /** Type of navigation */
  type: PropTypes.oneOf(['navigation', 'pagination', 'breadcrumbs', 'steps', 'tabs'])
}

const defaultProps = {
  type: 'navigation'
}

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
    const clsName = buildClassName(moduleName, 'divider')
    const dividerElement = (<div key={`divider--${index}`} className={clsName}>{divider}</div>)

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

  const mappedChildren = divider ? childrenWithDividers(children, divider) : children

  const clsName = buildClassName(moduleName, className, type)

  return (
    <ul className={clsName} {...passedProps}>
      {mappedChildren}
    </ul>
  )
}

Navigation.displayName = 'Navigation'

Navigation.propTypes = propTypes

Navigation.defaultProps = defaultProps

export default Navigation

import React from 'react'
import PropTypes from 'prop-types'

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
  type: PropTypes.oneOf(['breadcrumbs', 'navbar', 'pagination', 'sidebar', 'steps', 'tabs', 'tree'])
}

const defaultProps = {
  type: 'navbar'
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
function NavigationWrapper (props) {
  const { children, className, divider, type, ...passedProps } = props

  const clsName = buildClassName(moduleName, className, [type])

  return (
    <nav className={clsName} {...passedProps}>
      {children}
    </nav>
  )
}

NavigationWrapper.displayName = 'NavigationWrapper'

NavigationWrapper.propTypes = propTypes

NavigationWrapper.defaultProps = defaultProps

export default NavigationWrapper

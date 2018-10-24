import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

export const moduleName = 'navigation'

const propTypes = {
  /** Navigation items */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Should it be a panel? Applies only to Navigation type `sidebar`. */
  panel: PropTypes.bool,

  /** Should it be a panel? Applies only to Navigation type `sidebar`. */
  parent: PropTypes.bool,

  /** Submenu title. */
  subtitle: PropTypes.node,

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
 * @param {node} [props.children]
 * @param {string} [props.className]
 * @param {boolean} [props.panel]
 * @param {boolean} [props.parent]
 * @param {node} [props.subtitle]
 * @param {string} [props.type]
 *
 * @returns {React.Element}
 */
function NavigationWrapper (props) {
  const { children, className, panel, parent, subtitle, type, ...passedProps } = props

  const clsName = buildClassName(moduleName, className, { panel, parent }, [type])
  const subtitleCls = buildClassName([moduleName, 'subtitle'])

  return (
    <nav className={clsName} {...passedProps}>
      { subtitle && <div className={subtitleCls}>{subtitle}</div> }
      { children }
    </nav>
  )
}

NavigationWrapper.displayName = 'NavigationWrapper'

NavigationWrapper.propTypes = propTypes

NavigationWrapper.defaultProps = defaultProps

export default NavigationWrapper

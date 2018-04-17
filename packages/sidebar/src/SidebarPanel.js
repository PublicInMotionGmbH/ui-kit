import React from 'react'
import PropTypes from 'prop-types'

import { prefix, buildClassName } from '@talixo/shared'

import { Icon } from '@talixo/icon'

/**
 * Component which represents Sidebar.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.icon]
 * @param {string|*} [props.name]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function SidebarPanel (props) {
  const { className, children, name, icon, ...passedProps } = props

  // Build class name for panel
  const clsName = buildClassName('sidebar-panel', className)

  // Build header if panel has its name
  const header = name ? (
    <h2 className={prefix('sidebar-panel', 'header')}>
      <Icon name={icon} />
      <span>{name}</span>
    </h2>
  ) : null

  return (
    <div className={clsName} {...passedProps}>
      <div className={prefix('sidebar-panel', 'content')}>
        {header}
        {children}
      </div>
    </div>
  )
}

SidebarPanel.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Children to put inside, may be anything (including SidebarElements) */
  children: PropTypes.node,

  /** Icon name to show next to header */
  icon: PropTypes.string,

  /** Panel header: title */
  name: PropTypes.node
}

export default SidebarPanel

import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/commons'

import Icon from '@talixo/icon'

const moduleName = prefix('sidebar-panel')

/**
 * Component which represents Sidebar.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function SidebarPanel (props) {
  const { className, children, name, icon, ...passedProps } = props

  const clsName = cls(moduleName, className)

  const header = name ? (
    <h2 className={`${moduleName}__header`}>
      <Icon name={icon} />
      <span>{name}</span>
    </h2>
  ) : null

  return (
    <div className={clsName} {...passedProps}>
      <div className={`${moduleName}__content`}>
        {header}
        {children}
      </div>
    </div>
  )
}

SidebarPanel.propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

export default SidebarPanel

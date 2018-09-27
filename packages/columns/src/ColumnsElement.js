import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'columns-element'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Content to display in component */
  children: PropTypes.node,

  /** Max columns number in row */
  maxColumns: PropTypes.number,

  /** Header to show on top of section */
  header: PropTypes.node,

  /** Icon to show next to section */
  icon: PropTypes.node
}

/**
 * Component which represents ColumnsElement.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.children]
 * @param {number} [props.maxColumns]
 * @param {*} [props.header]
 * @param {*} [props.icon]
 * @returns {React.Element}
 */
function ColumnsElement (props) {
  const { className, children, maxColumns, header, icon, style, ...passedProps } = props

  const clsName = buildClassName(moduleName, className, {
    'with-header': header != null,
    'with-icon': header != null && icon != null
  })
  const iconClsName = buildClassName([ moduleName, 'icon' ])
  const contentClsName = buildClassName([ moduleName, 'content' ])
  const headerClsName = buildClassName([ moduleName, 'header' ])

  const columnsWidth = maxColumns ? `${100 / maxColumns}%` : null

  const iconElement = icon == null ? null : (
    <div className={iconClsName}>
      {icon}
    </div>
  )

  const headerElement = header == null ? null : (
    <header className={headerClsName}>
      {iconElement}
      <h3>{header}</h3>
    </header>
  )

  const content = children == null ? null : (
    <div className={contentClsName}>
      {children}
    </div>
  )

  return (
    <div
      className={clsName}
      style={{ ...style, flexBasis: columnsWidth }}
      {...passedProps}
    >
      {headerElement}
      {content}
    </div>
  )
}

ColumnsElement.displayName = 'ColumnsElement'

ColumnsElement.propTypes = propTypes

export default ColumnsElement

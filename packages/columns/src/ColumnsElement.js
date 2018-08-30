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

  /** Icon in header with indent content */
  headerIcon: PropTypes.node
}

/**
 * Component which represents ColumnsElement.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {node} [props.children]
 * @param {number} [props.maxColumns]
 * @param {node} [props.headerIcon]
 * @returns {React.Element}
 */
function ColumnsElement (props) {
  const { className, children, maxColumns, headerIcon, ...passedProps } = props

  const clsName = buildClassName(moduleName, className, {'header-icon': headerIcon})
  const clsIconName = buildClassName([moduleName, 'icon'])
  const clsContentName = buildClassName([moduleName, 'content'])
  const columnsWidth = maxColumns ? `${100 / maxColumns}%` : 'auto'

  /**
   * Render icon container
   * @returns {React.Element}
   */
  const renderIcon = () => {
    return (
      <div className={clsIconName}>
        {headerIcon}
      </div>
    )
  }

  /**
   * Render content container
   * @returns {React.Element}
   */
  const renderContent = () => {
    return (
      <div className={clsContentName}>
        {children}
      </div>
    )
  }

  return (
    <div
      className={clsName} {...passedProps}
      style={{
        flexBasis: columnsWidth
      }}
    >
      {headerIcon && renderIcon()}
      {children && renderContent()}
    </div>
  )
}

ColumnsElement.displayName = 'ColumnsElement'

ColumnsElement.propTypes = propTypes

export default ColumnsElement

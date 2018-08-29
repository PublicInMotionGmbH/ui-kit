import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

// import { Icon } from '@talixo/icon'

const moduleName = 'columns-element'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

const defaultProps = {
}

/**
 * Component which represents Columns.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function ColumnsElement (props) {
  const { className, children, maxColumns, withIcon, ...passedProps } = props

  const clsName = buildClassName(moduleName, className, {'with-icon': withIcon})
  const clsIconName = buildClassName([moduleName, 'icon'])
  const clsContentName = buildClassName([moduleName, 'content'])
  const columnsWidth = 100 / maxColumns

  const renderIcon = () => {
    return (
      <div className={clsIconName}>
        {withIcon}
      </div>
    )
  }

  const renderChildren = () => {
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
        flexBasis: `${columnsWidth}%`
      }}
    >
      {withIcon && renderIcon()}
      {children && renderChildren()}
    </div>
  )
}

ColumnsElement.displayName = 'ColumnsElement'

ColumnsElement.propTypes = propTypes
ColumnsElement.defaultProps = defaultProps

export default ColumnsElement

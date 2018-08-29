import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'columns'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Max columns number in row */
  maxColumns: PropTypes.number
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
function Columns (props) {
  const { className, children, maxColumns, ...passedProps } = props

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { maxColumns: maxColumns }))

  return (
    <div className={buildClassName(moduleName, className)} {...passedProps}>
      {childrenWithProps}
    </div>
  )
}

Columns.displayName = 'Columns'

Columns.propTypes = propTypes
Columns.defaultProps = defaultProps

export default Columns

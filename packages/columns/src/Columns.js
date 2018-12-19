import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'columns'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Columns elements passed as children */
  children: PropTypes.node,

  /** Max columns number in row */
  maxColumns: PropTypes.number
}

/**
 * Component which represents Columns.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {node} [props.children]
 * @param {number} [props.maxColumns]
 * @returns {React.Element}
 */
function Columns (props) {
  const { className, children, maxColumns, ...passedProps } = props

  const childrenWithProps = React.Children.map(
    children,
    child => child && React.cloneElement(child, { maxColumns })
  )

  const clsName = buildClassName(moduleName, className, {
    empty: [].concat(children).filter(Boolean).length === 0
  })

  return (
    <div className={clsName} {...passedProps}>
      {childrenWithProps}
    </div>
  )
}

Columns.displayName = 'Columns'

Columns.propTypes = propTypes

export default Columns

import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

/**
 * Component which represents DataTable.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function DataTable (props) {
  const { className, ...passedProps } = props

  return (
    <span className={buildClassName('data-table', className)} {...passedProps} />
  )
}

DataTable.propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

DataTable.defaultProps = {
}

export default DataTable

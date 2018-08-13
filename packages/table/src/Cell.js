import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  /** Nodes to include inside cell */
  children: PropTypes.node
}

/**
 * Component which represents simple Table row cell.
 *
 * @param {object} props
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function Cell (props) {
  const { children, ...passedProps } = props

  return (
    <td {...passedProps}>
      {children}
    </td>
  )
}

Cell.displayName = 'Cell'

Cell.propTypes = propTypes

export default Cell

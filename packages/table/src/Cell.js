import React from 'react'
import PropTypes from 'prop-types'

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

Cell.propTypes = {
  /** Nodes to include inside cell */
  children: PropTypes.node
}

export default Cell

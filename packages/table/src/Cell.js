import React from 'react'
import PropTypes from 'prop-types'

/**
 * Component which represents simple Table row cell.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function Cell (props) {
  const { className, children, ...passedProps } = props

  return (
    <td className={className} {...passedProps}>
      {children}
    </td>
  )
}

Cell.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  children: PropTypes.node
}

export default Cell

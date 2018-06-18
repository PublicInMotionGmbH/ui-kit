import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  /** Cells to put inside row */
  children: PropTypes.node
}

/**
 * Component which represents Table content row.
 *
 * @param {object} props
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function Row (props) {
  const { children, ...passedProps } = props

  return (
    <tr {...passedProps}>
      {children}
    </tr>
  )
}

Row.propTypes = propTypes

export default Row

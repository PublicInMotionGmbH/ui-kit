import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  /** Head cell content */
  children: PropTypes.node
}

/**
 * Component which represents Table Head column.
 *
 * @param {object} props
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function HeadCell (props) {
  const { children, ...passedProps } = props

  return (
    <th {...passedProps}>
      {children}
    </th>
  )
}

HeadCell.displayName = 'HeadCell'

HeadCell.propTypes = propTypes

export default HeadCell

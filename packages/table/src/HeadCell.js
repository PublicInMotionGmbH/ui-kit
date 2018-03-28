import React from 'react'
import PropTypes from 'prop-types'

/**
 * Component which represents Table Head column.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function HeadCell (props) {
  const { className, children, ...passedProps } = props

  return (
    <th className={className} {...passedProps}>
      {children}
    </th>
  )
}

HeadCell.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  children: PropTypes.node
}

export default HeadCell

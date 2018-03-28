import React from 'react'
import PropTypes from 'prop-types'

/**
 * Component which represents Table content row.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function Row (props) {
  const { className, children, ...passedProps } = props

  return (
    <tr className={className} {...passedProps}>
      {children}
    </tr>
  )
}

Row.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  children: PropTypes.node
}

export default Row

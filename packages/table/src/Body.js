import React from 'react'
import PropTypes from 'prop-types'

/**
 * Component which represents Table Body.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function Body (props) {
  const { className, children, ...passedProps } = props

  return (
    <tbody className={className} {...passedProps}>
      {children}
    </tbody>
  )
}

Body.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  children: PropTypes.node
}

export default Body

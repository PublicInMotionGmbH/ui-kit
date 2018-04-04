import React from 'react'
import PropTypes from 'prop-types'

/**
 * Component which represents Table Body.
 *
 * @param {object} props
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function Body (props) {
  const { children, ...passedProps } = props

  return (
    <tbody{...passedProps}>
      {children}
    </tbody>
  )
}

Body.propTypes = {
  /** Rows to put inside */
  children: PropTypes.node
}

export default Body

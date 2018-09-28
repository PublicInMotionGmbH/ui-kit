import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  /** Rows to put inside */
  children: PropTypes.node
}

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

Body.displayName = 'Body'

Body.propTypes = propTypes

export default Body

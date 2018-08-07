import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  /** HeadCells to put inside */
  children: PropTypes.node
}

/**
 * Component which represents Table Head with single row.
 *
 * @param {object} props
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function Head (props) {
  const { children, ...passedProps } = props

  return (
    <thead {...passedProps}>
      <tr>
        {children}
      </tr>
    </thead>
  )
}

Head.displayName = 'Head'

Head.propTypes = propTypes

export default Head

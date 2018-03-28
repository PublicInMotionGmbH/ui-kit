import React from 'react'
import PropTypes from 'prop-types'

/**
 * Component which represents Table Head.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function Head (props) {
  const { className, children, ...passedProps } = props

  return (
    <thead className={className} {...passedProps}>
      <tr>
        {children}
      </tr>
    </thead>
  )
}

Head.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  children: PropTypes.node
}

export default Head

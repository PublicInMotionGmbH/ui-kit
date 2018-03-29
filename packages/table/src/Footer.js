import React from 'react'
import PropTypes from 'prop-types'

/**
 * Component which represents Table Footer.
 *
 * @param {object} props
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function Footer (props) {
  const { children, ...passedProps } = props

  return (
    <tfoot {...passedProps}>
      <tr>
        {children}
      </tr>
    </tfoot>
  )
}

Footer.propTypes = {
  /** Cells which should be included in table footer */
  children: PropTypes.node
}

export default Footer

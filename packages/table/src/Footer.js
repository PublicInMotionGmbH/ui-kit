import React from 'react'
import PropTypes from 'prop-types'

/**
 * Component which represents Table Footer.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function Footer (props) {
  const { className, children, ...passedProps } = props

  return (
    <tfoot className={className} {...passedProps}>
      <tr>
        {children}
      </tr>
    </tfoot>
  )
}

Footer.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  children: PropTypes.node
}

export default Footer

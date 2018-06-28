import React from 'react'
import PropTypes from 'prop-types'

import { prefix, buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Sidebar elements */
  children: PropTypes.node
}

/**
 * Component which represents Sidebar.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function Sidebar (props) {
  const { className, children, ...passedProps } = props

  return (
    <nav className={buildClassName('sidebar', className)} {...passedProps}>
      <div className={prefix('sidebar', 'content')}>
        {children}
      </div>
    </nav>
  )
}

Sidebar.propTypes = propTypes

export default Sidebar

import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/shared'

const moduleName = prefix('sidebar')

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
    <nav className={cls(className, moduleName)} {...passedProps}>
      <div className={`${moduleName}__content`}>
        {children}
      </div>
    </nav>
  )
}

Sidebar.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Sidebar elements */
  children: PropTypes.node
}

export default Sidebar
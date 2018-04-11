import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/shared'

const moduleName = prefix('lead')

/**
 * Component which represents article/page lead.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function Lead (props) {
  const { className, children, ...passedProps } = props

  return (
    <p className={cls(moduleName, className)} {...passedProps}>
      {children}
    </p>
  )
}

Lead.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Lead content */
  children: PropTypes.node
}

export default Lead

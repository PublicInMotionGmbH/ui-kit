import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/shared'

const name = prefix('badge')

/**
 * Component which represents badge
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {node} [props.children]
 * @param {object} [props.style]
 */
function Badge (props) {
  const { children, className, ...passedProps } = props

  const clsName = cls(name, className)

  return (
    <span className={clsName} {...passedProps}>
      {children}
    </span>
  )
}

Badge.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Node element to display inside badge */
  children: PropTypes.node
}

export default Badge

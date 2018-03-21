import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/commons'

const name = prefix('badge')

/**
 * Component which represents badge
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {node} [props.children]
 * @param {object} [props.style]
 */
const Badge = ({ children, className, style }) => {
  const clsName = cls(name, className)

  return (
    <span
      className={clsName}
      style={style}
    >
      {children}
    </span>
  )
}

Badge.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Node element to display inside bage */
  children: PropTypes.node,

  /** Additional styles */
  style: PropTypes.object
}

Badge.defaultProps = {
}

export default Badge

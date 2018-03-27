import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/commons'

const moduleName = prefix('pill')

/**
 * Component which represents Pill.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.color]
 * @param {string} [props.variant]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function Pill (props) {
  const { children, className, color, variant, ...passedProps } = props

  const clsName = cls(moduleName, className, {
    [`${moduleName}--${color}`]: color !== undefined,
    [`${moduleName}--${variant}`]: variant !== undefined
  })

  return (
    <span className={clsName} {...passedProps}>
      {children}
    </span>
  )
}

Pill.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Children */
  children: PropTypes.node,

  /** Pill color */
  color: PropTypes.string,

  /** Pill variant */
  variant: PropTypes.string
}

export default Pill

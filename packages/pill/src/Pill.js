import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/commons'

const name = prefix('pill')

/**
 * Component which represents Pill.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function Pill (props) {
  const { children, className, color, style, variant, ...passedProps } = props

  return (
    <span
      className={cls(name, className, {
        [`${name}--${color}`]: color !== undefined,
        [`${name}--${variant}`]: variant !== undefined
      })}
      {...passedProps}
      style={style}
    >
      {children}
    </span>
  )
}

Pill.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Children */
  children: PropTypes.node,

  /** Color */
  color: PropTypes.string,

  /** CSS Styles */
  style: PropTypes.object,

  /** Variants */
  variant: PropTypes.string
}

export default Pill

import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/commons'

const name = prefix('button')

/**
 * Component which represents button.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.color]
 * @param {*} [props.disabled]
 * @param {*} [props.id]
 * @param {*} [props.onClick]
 * @param {*} [props.size]
 * @param {*} [props.style]
 * @param {*} [props.variant]
 * @returns {React.Element}
 */
function Button (props) {
  const { children, className, color, disabled, id, onClick, size, style, variant, ...passedProps } = props

  const mappedChildren = React.Children.map(children, child => {
    return typeof child === 'string' ? <span>{child}</span> : child
  })
  return (
    <button
      className={cls(name, className, {
        [`${name}--${color}`]: color !== undefined,
        [`${name}--${size}`]: size !== undefined,
        [`${name}--${variant}`]: variant !== undefined
      })}
      style={style}
      id={id}
      onClick={onClick}
      disabled={disabled}
      {...passedProps}
    >
      {mappedChildren}
    </button>
  )
}

Button.propTypes = {
  /** All button below */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Button color */
  color: PropTypes.string,

  /** Disabled or not */
  disabled: PropTypes.bool,

  /** Button Id */
  id: PropTypes.string,

  /** Action on click */
  onClick: PropTypes.func,

  /** Button size */
  size: PropTypes.string,

  /** Button style */
  style: PropTypes.object,

  /** Button variant */
  variant: PropTypes.string
}

Button.defaultProps = {
  disabled: false
}

export default Button

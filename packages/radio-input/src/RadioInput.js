import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/commons'

const moduleName = prefix('radio-input')

/**
 * Component which represents Radio Input.
 *
 * @param {object} props
 * @param {node} [props.children]
 * @param {string} [props.className]
 * @param {string} [props.size]
 * @param {object} [props.style]
 * @returns {React.Element}
 */
function RadioInput (props) {
  const { children, className, size, style, ...passedProps } = props

  const wrapperClass = cls(moduleName, className, {
    [`${moduleName}-${size}`]: size !== undefined
  })

  return (
    <label className={wrapperClass} style={style}>
      <input type='radio' {...passedProps} />
      <span>{children}</span>
    </label>
  )
}

RadioInput.propTypes = {
  /** Radio button description  */
  children: PropTypes.node,

  /** Additional wrapper class name */
  className: PropTypes.string,

  /** Size of input (can be 'small') */
  size: PropTypes.string,

  /** Styles passed to radio button wrapper */
  style: PropTypes.object
}

export default RadioInput

import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import Icon from '@talixo/icon'
import { prefix } from '@talixo/shared'

const moduleName = prefix('number-input')

/**
 * Component which represents NumberInput.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.className]
 * @param {string} [props.className]
 * @param {string} [props.className]
 * @param {string} [props.className]
 * @param {string} [props.className]
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function NumberInput (props) {
  const { className, hasError, placeholder, size, style, value, ...passedProps } = props
  let input
  const increment = () => {
    input.value++
  }
  const decrement = () => {
    input.value--
  }
  const inputRef = node => { input = node }
  const wrapperClass = cls(moduleName, {
    [`${moduleName}--${size}`]: size !== undefined,
    [`${moduleName}--error`]: hasError
  })

  return (
    <div
      className={wrapperClass}
      style={style}
    >
      <input
        ref={inputRef}
        className={className}
        type='number'
        value={value}
        {...passedProps}
      />
      <div className={`${moduleName}__stepper`}>
        <button
          className={`${moduleName}__button`}
          onClick={increment}
        >
          <Icon name='add' />
        </button>
        <button
          className={`${moduleName}__button`}
          onClick={decrement}
        >
          <Icon name='remove' />
        </button>
      </div>
    </div>
  )
}

NumberInput.propTypes = {
  /** Additional class name of input  */
  className: PropTypes.string,

  /** Indicates that input has error */
  hasError: PropTypes.bool,

  /** Size of input (can be 'small') */
  size: PropTypes.string,

  /** Additional styling of wrapper */
  style: PropTypes.object,

  /** Default input value */
  value: PropTypes.number
}

NumberInput.defaultProps = {
  hasError: false,
  value: 0
}

export default NumberInput

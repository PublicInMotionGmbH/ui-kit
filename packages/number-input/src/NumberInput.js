import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/commons'
import Icon from '@talixo/icon'

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
  const { className, hasError, name, onChange, placeholder, size, style, ...passedProps } = props
  let input
  const increment = () => {
    input.value++
  }
  const decrement = () => {
    input.value--
  }

  return (
    <div
      className={cls(moduleName, {
        [`${moduleName}--${size}`]: size !== undefined,
        [`${moduleName}--error`]: hasError
      })}
      style={style}
    >
      <input
        ref={node => {
          input = node
        }}
        className={className}
        type='number'
        {...passedProps}
      />
      <div className={`${moduleName}__stepper`}>
        <button className={`${moduleName}__button`} onClick={increment}>
          <Icon name='add' />
        </button>
        <button className={`${moduleName}__button`} onClick={decrement}>
          <Icon name='remove' />
        </button>
      </div>
    </div>
  )
}

NumberInput.propTypes = {
  /** Additional class name passed to input */
  className: PropTypes.string,

  /** Indicates that input has error */
  hasError: PropTypes.bool,

  /** Size of input (can be 'small') */
  size: PropTypes.string,

  /** Additional styling */
  style: PropTypes.object
}

NumberInput.defaultProps = {
  hasError: false
}

export default NumberInput

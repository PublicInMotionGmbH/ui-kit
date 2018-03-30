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
 * @param {boolean} [props.hasError]
 * @param {string} [props.size]
 * @param {object} [props.style]
 * @param {number} [props.value]
 * @returns {React.Element}
 */
function NumberInput (props) {
  const { className, hasError, size, style, ...passedProps } = props

  let input

  /**
   * Change input value, if it's a number
   *
   * @param {number} delta
   */
  function change (delta) {
    const value = parseFloat(input.value)

    // Do not change value if it's not correct
    if (isNaN(value)) {
      return
    }

    input.value = value + delta
  }

  const increment = () => change(1)
  const decrement = () => change(-1)
  const inputRef = node => { input = node }

  const wrapperClass = cls(moduleName, {
    [`${moduleName}--${size}`]: size && size.length > 0,
    [`${moduleName}--error`]: hasError
  })

  return (
    <div className={wrapperClass} style={style}>
      <input
        ref={inputRef}
        className={className}
        type='number'
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
  size: PropTypes.oneOf(['small']),

  /** Additional styling of wrapper */
  style: PropTypes.object,

  /** Input value */
  value: PropTypes.number
}

NumberInput.defaultProps = {
  hasError: false,
  value: 0
}

export default NumberInput

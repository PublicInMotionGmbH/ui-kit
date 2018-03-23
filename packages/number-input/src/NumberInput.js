import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/commons'

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
  const { className, errors, name, onChange, placeholder, size, style, ...passedProps } = props
  let input
  const increment = () => {
    input.value++
  }
  const decrement = () => {
    input.value--
  }

  return (
    <div
      className={cls(moduleName, className, {
        [`${moduleName}-${size}`]: size !== undefined,
        'errors': errors.length > 0
      })}
      style={style}
    >
      <input
        ref={node => {
          input = node
        }}
        type='number'
        {...passedProps}
      />
      <div className={prefix('number-input-stepper')}>
        <button className={prefix('number-input-button')} onClick={increment}>
          <span className='material-icons'>add</span>
        </button>
        <button className={prefix('number-input-button')} onClick={decrement}>
          <span className='material-icons'>remove</span>
        </button>
      </div>
    </div>
  )
}

NumberInput.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** List of errors */
  errors: PropTypes.arrayOf(PropTypes.string),

  /** Size of input (can be 'small') */
  size: PropTypes.string,

  /** Additional styling */
  style: PropTypes.object
}

NumberInput.defaultProps = {
  errors: []
}

export default NumberInput

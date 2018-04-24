import React from 'react'
import PropTypes from 'prop-types'

import { RadioInput } from '@talixo/radio-input'

import { buildClassName } from '@talixo/shared'

/**
 * Component which represents RadioGroup.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.name]
 * @param {array} [props.options]
 * @param {string} [props.size]
 * @param {string|number} [props.value]
 * @param {array} [props.disabled]
 * @returns {React.Element}
 */
function RadioGroup (props) {
  const { className, children, name, options, value, size, disabled, ...passedProps } = props
  return (
    <div className={buildClassName('radio-group', className)} {...passedProps} >
      {options.map((obj) =>
        <RadioInput key={obj.value} name={name} value={obj.value} size={size} defaultChecked={value === obj.value} disabled={disabled.includes(obj.value)} {...passedProps} >
          {obj.label}
        </RadioInput>
      )}
    </div>
  )
}

RadioGroup.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Name of radio group */
  name: PropTypes.string.isRequired,

  /** Array of objects which represent options */
  options: PropTypes.array.isRequired,

  /** Radio input label size ('small', 'large') */
  size: PropTypes.oneOf([ 'small', 'large' ]),

  /** Value of default option */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),

  /** Array of disabled options */
  disabled: PropTypes.array
}

RadioGroup.defaultProps = {
  disabled: []
}

export default RadioGroup

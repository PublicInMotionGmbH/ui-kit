import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '@talixo/icon'
import { NumberInput } from '@talixo/number-input'
import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Data for generate ListOption */
  option: PropTypes.object,

  /** Value of input */
  value: PropTypes.number
}

/**
 * * Component which represents ListOption.
 *
 * @param {*} props
 * @param {object} [props.option]
 * @param {number} [props.options.default]
 *
 * @returns {React.Element}
 */
function ListOption (props) {
  const { option, value, onChange } = props

  const clsName = buildClassName('options-input__list-option', {
    'options-input__list-option--active': value > 0
  })

  const icon = (
    <Icon name={option.icon} />
  )

  const label = (
    <div className='options-input__list-option__label'>
      <span className='options-input__list-option__title'>{option.label}</span>
      <span className='options-input__list-option__description'>{option.description}</span>
    </div>
  )

  return (
    <div className={clsName}>
      <NumberInput
        left={icon}
        suffix={label}
        value={value}
        onChange={value => onChange(option.id, value)}
        min={option.min}
        max={option.max}
      />
    </div>
  )
}

ListOption.propTypes = propTypes

export default ListOption

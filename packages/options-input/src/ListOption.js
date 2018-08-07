import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '@talixo/icon'
import { NumberInput } from '@talixo/number-input'
import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Option to show */
  option: PropTypes.shape({
    /** Id for option */
    id: PropTypes.string.isRequired,

    /** Type of icon */
    icon: PropTypes.string,

    /** Label for option */
    label: PropTypes.string,

    /** Default value */
    default: PropTypes.number,

    /** Minimum value within the range */
    min: PropTypes.number,

    /** Maximum value within the range */
    max: PropTypes.number
  }),

  /** Value of input */
  value: PropTypes.number,

  /** Event handler fired on value change */
  onChange: PropTypes.func
}

export const moduleName = 'options-input-list-option'

/**
 * * Component which represents ListOption.
 *
 * @param {object} props
 * @param {object} [props.option]
 * @param {number} [props.value]
 * @param {function} [props.onChange]
 *
 * @returns {React.Element}
 */
function ListOption (props) {
  const { option, value, onChange } = props

  const clsName = buildClassName(moduleName, null, {
    active: value > 0 || value < 0
  })

  const icon = (
    <Icon name={option.icon} />
  )

  const label = (
    <div className={buildClassName([ moduleName, 'label' ])}>
      <span className={buildClassName([ moduleName, 'title' ])}>{option.label}</span>
      <span className={buildClassName([ moduleName, 'description' ])}>{option.description}</span>
    </div>
  )

  return (
    <div className={clsName}>
      <NumberInput
        endCaretOnFocus
        data-hj-whitelist
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

ListOption.displayName = 'ListOption'

ListOption.propTypes = propTypes

export default ListOption

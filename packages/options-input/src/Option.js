import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { Icon } from '@talixo/icon'
import { Tooltip } from '@talixo/tooltip'

import OptionTooltipContent from './OptionTooltipContent'

const propTypes = {
  /* Additional class name */
  className: PropTypes.string,

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

  /** Value of option */
  value: PropTypes.number.isRequired,

  /** Is it dummy element? */
  dummy: PropTypes.bool
}

export const moduleName = 'options-input-option'

/**
 * * Component which represents Option.
 *
 * @param {object} props
 * @param {object} props.option
 * @param {number} [props.value]
 *
 * @returns {React.Element}
 */
function Option (props) {
  const { option, value, className, dummy } = props

  const content = (
    <OptionTooltipContent
      title={option.label}
      description={option.description}
    />
  )

  const icon = <span><Icon name={option.icon} /></span>

  const iconElement = option.label || option.description ? (
    <Tooltip render={() => content} position='top'>
      {icon}
    </Tooltip>
  ) : icon

  const clsName = buildClassName(moduleName, className, { dummy })

  return (
    <span className={clsName}>
      {iconElement}
      <span>{value}</span>
    </span>
  )
}

Option.propTypes = propTypes

export default Option

import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import Option from './Option'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Options to show */
  options: PropTypes.arrayOf(PropTypes.shape({
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
  })),

  /** Input value */
  value: PropTypes.object.isRequired
}

export const moduleName = 'options-input-value'

// FIXME: this option is used only to make sure that even empty input will behave the same
const DUMMY_OPTION = {
  id: 'abc',
  icon: 'rocket',
  value: 0
}

/**
 * * Component which represents Option.
 *
 * @param {object} props
 * @param {object} props.option
 * @param {number} [props.value]
 *
 * @returns {React.Element}
 */
function OptionsInputValue (props) {
  const { options, value } = props

  const elements = options.filter(x => value[x.id]).map(x => (
    <Option
      key={x.id}
      option={x}
      value={value[x.id]}
    />
  ))

  return (
    <div className={buildClassName(moduleName)}>
      <Option
        dummy
        option={DUMMY_OPTION}
        value={DUMMY_OPTION.value}
      />
      {elements.length === 0 ? ' ' : elements}
    </div>
  )
}

OptionsInputValue.propTypes = propTypes

export default OptionsInputValue

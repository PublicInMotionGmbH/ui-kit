import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '@talixo/icon'
import { Tooltip } from '@talixo/tooltip'

import OptionLabel from './OptionLabel'

const propTypes = {
  /** Data for generate Option */
  option: PropTypes.object,

  /** Value of input */
  value: PropTypes.number
}

/**
 * * Component which represents Option.
 *
 * @param {object} props
 * @param {object} props.option
 * @param {*} [props.value]
 *
 * @returns {React.Element}
 */
function Option (props) {
  const { option, value } = props

  return (
    <span className='options-input__option'>
      <Tooltip render={() => <OptionLabel option={option} />} position='top'>
        <span><Icon name={option.icon} /></span>
      </Tooltip>
      <span>{value}</span>
    </span>
  )
}

Option.propTypes = propTypes

export default Option

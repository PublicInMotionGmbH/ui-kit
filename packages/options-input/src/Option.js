import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '@talixo/icon'
import { Tooltip } from '@talixo/tooltip'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Data for generate Option */
  option: PropTypes.object,

  /** Value of input */
  value: PropTypes.number
}

/**
 * * Component which represents Option.
 *
 * @param {*} props
 * @param {object} [props.option]
 * @param {number} [props.options.default]
 *
 * @returns {React.Element}
 */
function Option (props) {
  const { option, value } = props

  const label = <React.Fragment>
    <h6>{option.label}</h6>
    {option.description ? <p>{option.description}</p> : null}
  </React.Fragment>

  return (
    <span className='options-input__option'>
      <Tooltip render={() => label} position='top'>
        <span><Icon name={option.icon} /></span>
      </Tooltip>
      <span>{value}</span>
    </span>
  )
}

Option.propTypes = propTypes

export default Option

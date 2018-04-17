import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import config from '../config'

import CountryFlagsSprite from './CountryFlagsSprite'

/**
 * Component which represents Flag.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function CountryFlag (props) {
  const { className, code, ...passedProps } = props

  return (
    <svg className={buildClassName('country-flag', className)} {...passedProps}>
      <CountryFlagsSprite />
      <use xlinkHref={`#${config.prefix}-${code.toLowerCase()}`} />
    </svg>
  )
}

CountryFlag.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  code: PropTypes.string.isRequired
}

export default CountryFlag

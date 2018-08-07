import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import config from '../config'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Country code */
  code: PropTypes.string.isRequired
}

const contextTypes = {
  registerFlag: PropTypes.func,
  unregisterFlag: PropTypes.func
}

/**
 * Component which represents Flag.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
class CountryFlag extends React.PureComponent {
  componentDidMount () {
    if (this.context.registerFlag) {
      this.context.registerFlag()
    }
  }

  componentWillUnmount () {
    if (this.context.unregisterFlag) {
      this.context.unregisterFlag()
    }
  }

  render () {
    const { className, code, ...passedProps } = this.props

    return (
      <svg className={buildClassName('country-flag', className)} {...passedProps}>
        <use xlinkHref={`#${config.prefix}-${code.toLowerCase()}`} />
      </svg>
    )
  }
}

CountryFlag.displayName = 'CountryFlag'

CountryFlag.contextTypes = contextTypes
CountryFlag.propTypes = propTypes

export default CountryFlag

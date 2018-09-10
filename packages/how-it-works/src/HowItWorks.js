import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

const defaultProps = {
}

/**
 * Component which represents HowItWorks.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function HowItWorks (props) {
  const { className, ...passedProps } = props

  return (
    <span className={buildClassName('how-it-works', className)} {...passedProps} />
  )
}

HowItWorks.displayName = 'HowItWorks'

HowItWorks.propTypes = propTypes
HowItWorks.defaultProps = defaultProps

export default HowItWorks

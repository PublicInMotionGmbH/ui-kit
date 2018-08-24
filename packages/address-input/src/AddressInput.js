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
 * Component which represents AddressInput.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function AddressInput (props) {
  const { className, ...passedProps } = props

  return (
    <span className={buildClassName('address-input', className)} {...passedProps} />
  )
}

AddressInput.displayName = 'AddressInput'

AddressInput.propTypes = propTypes
AddressInput.defaultProps = defaultProps

export default AddressInput

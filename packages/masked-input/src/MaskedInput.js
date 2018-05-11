import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

/**
 * Component which represents Masked Input.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function MaskedInput (props) {
  const { className, ...passedProps } = props

  return (
    <span className={buildClassName('masked-input', className)} {...passedProps} />
  )
}

MaskedInput.propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

MaskedInput.defaultProps = {
}

export default MaskedInput

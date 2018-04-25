import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

/**
 * Component which represents Form.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function Form (props) {
  const { className, ...passedProps } = props

  return (
    <span className={buildClassName('form', className)} {...passedProps} />
  )
}

Form.propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

Form.defaultProps = {
}

export default Form

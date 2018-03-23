import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/commons'

const name = prefix('text-input')

/**
 * Component which represents Text Input.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function TextInput (props) {
  const { className, ...passedProps } = props

  return (
    <span className={cls(className, name)} {...passedProps} />
  )
}

TextInput.propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

TextInput.defaultProps = {
}

export default TextInput

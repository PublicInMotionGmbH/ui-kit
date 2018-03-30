import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/shared'

const name = prefix('__id__')

/**
 * Component which represents __title__.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function __name__ (props) {
  const { className, ...passedProps } = props

  return (
    <span className={cls(className, name)} {...passedProps} />
  )
}

__name__.propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

__name__.defaultProps = {
}

export default __name__

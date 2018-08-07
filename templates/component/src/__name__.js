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
 * Component which represents __title__.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function __name__ (props) {
  const { className, ...passedProps } = props

  return (
    <span className={buildClassName('__id__', className)} {...passedProps} />
  )
}

__name__.displayName = '__name__'

__name__.propTypes = propTypes
__name__.defaultProps = defaultProps

export default __name__

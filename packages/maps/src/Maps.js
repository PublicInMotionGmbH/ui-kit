import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/shared'

const name = prefix('maps')

/**
 * Component which represents Maps.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function Maps (props) {
  const { className, ...passedProps } = props

  return (
    <span className={cls(className, name)} {...passedProps} />
  )
}

Maps.propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

Maps.defaultProps = {
}

export default Maps

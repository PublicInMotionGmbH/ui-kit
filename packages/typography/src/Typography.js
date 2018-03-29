import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/shared'

const name = prefix('typography')

/**
 * Component which represents Typography.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function Typography (props) {
  const { className, ...passedProps } = props

  return (
    <span className={cls(className, name)} {...passedProps} />
  )
}

Typography.propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

Typography.defaultProps = {
}

export default Typography

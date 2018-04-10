import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/shared'

const moduleName = prefix('charts')

/**
 * Component which represents Charts.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function Charts (props) {
  const { className, ...passedProps } = props

  return (
    <span className={cls(className, moduleName)} {...passedProps} />
  )
}

Charts.propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

Charts.defaultProps = {
}

export default Charts

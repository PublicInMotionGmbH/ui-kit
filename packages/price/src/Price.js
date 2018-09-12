import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'price'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

const defaultProps = {
}

/**
 * Component which represents Price.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function Price (props) {
  const { className, ...passedProps } = props
  const wrapperCls = buildClassName(moduleName, className)

  return (
    <span className={wrapperCls} {...passedProps} />
  )
}

Price.displayName = 'Price'

Price.propTypes = propTypes
Price.defaultProps = defaultProps

export default Price

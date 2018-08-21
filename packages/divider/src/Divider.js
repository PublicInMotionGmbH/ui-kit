import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

export const moduleName = 'divider'

const propTypes = {
  /** Additional class name. */
  className: PropTypes.string,

  /** Changes top and bottom padding of divider to smaller. */
  small: PropTypes.bool
}

const defaultProps = {
  small: false
}

/**
 * Component which represents Divider.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {boolean} [props.small]
 * @returns {React.Element}
 */
function Divider (props) {
  const { className, children, small, ...passedProps } = props
  const dividerCls = buildClassName(moduleName, className, { small })
  const spanCls = buildClassName([moduleName, 'text'])

  return (
    <div className={dividerCls} {...passedProps}>
      { children && <span className={spanCls}>{children}</span> }
    </div>
  )
}

Divider.displayName = 'Divider'

Divider.propTypes = propTypes
Divider.defaultProps = defaultProps

export default Divider

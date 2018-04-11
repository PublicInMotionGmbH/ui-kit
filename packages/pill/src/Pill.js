import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

/**
 * Component which represents Pill.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.color]
 * @param {string} [props.variant]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function Pill (props) {
  const { children, className, color, variant, ...passedProps } = props

  const clsName = buildClassName('pill', className, [ color, variant ])

  return (
    <span className={clsName} {...passedProps}>
      {children}
    </span>
  )
}

Pill.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Children */
  children: PropTypes.node,

  /** Pill color */
  color: PropTypes.string,

  /** Pill variant */
  variant: PropTypes.string
}

export default Pill

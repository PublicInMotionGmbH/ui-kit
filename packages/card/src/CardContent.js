import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

/**
 * Component which card content.
 *
 * @param {object} props
 * @param {*} [props.children]
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function CardContent (props) {
  const { children, className, ...passedProps } = props

  const clsName = buildClassName([ 'card', 'content' ], className)

  return (
    <div className={clsName} {...passedProps}>
      {children}
    </div>
  )
}

CardContent.propTypes = {
  /** All nodes inside CardContent */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string
}

export default CardContent

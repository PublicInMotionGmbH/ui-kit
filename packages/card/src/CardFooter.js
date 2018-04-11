import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

/**
 * Component which card footer.
 *
 * @param {object} props
 * @param {*} [props.children]
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function CardFooter (props) {
  const { children, className, ...passedProps } = props

  const clsName = buildClassName([ 'card', 'footer' ], className)

  return (
    <div className={clsName} {...passedProps}>
      {children}
    </div>
  )
}

CardFooter.propTypes = {
  /** All nodes inside CardFooter */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string
}

export default CardFooter

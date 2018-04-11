import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

/**
 * Component which card.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function Card (props) {
  const { children, className, ...passedProps } = props

  const clsName = buildClassName('card', className)

  return (
    <div className={clsName} {...passedProps}>
      {children}
    </div>
  )
}

Card.propTypes = {
  /** All cards component below */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string
}

export default Card

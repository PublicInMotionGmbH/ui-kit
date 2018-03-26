import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/commons'

const name = prefix('card')

/**
 * Component which card.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */

function Card (props) {
  const { children, className, ...passedProps } = props
  return (
    <div className={cls(name, className)} {...passedProps}>
      {children}
    </div>
  )
}

Card.propTypes = {
  /** All cards component below */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Action on event */
  onClick: PropTypes.func,

  /** Style CSS */
  style: PropTypes.object,

  /** to */
  to: PropTypes.string
}

export default Card

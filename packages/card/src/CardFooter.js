import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/commons'

const name = prefix('card-content')

/**
 * Component which card footer.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */

function CardFooter (props) {
  const { children, className, ...passedProps } = props
  return (
    <div className={cls(name, className)} {...passedProps}>
      {children}
    </div>
  )
}

CardFooter.propTypes = {
  /** All nodes inside button */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Style CSS */
  style: PropTypes.object
}

export default CardFooter

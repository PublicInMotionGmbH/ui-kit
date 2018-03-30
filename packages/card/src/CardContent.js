import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/shared'

const moduleName = prefix('card')

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
  return (
    <div className={cls(`${moduleName}--content`, className)} {...passedProps}>
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

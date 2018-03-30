import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/shared'

const moduleName = prefix('card-header')

/**
 * Component which card header.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function CardHeader (props) {
  const { children, className, title, ...passedProps } = props

  const mappedChildren = React.Children.map(children, child => {
    return typeof child === 'string' ? <span>{child}</span> : child
  })
  return (
    <div className={cls(moduleName, className)} {...passedProps}>
      {title ? (
        <div className='card-title'>
          <div>{title}</div>
        </div>
      ) : null}
      {mappedChildren}
    </div>
  )
}

CardHeader.propTypes = {
  /** All children inside CardHeader */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Title of CardHeader */
  title: PropTypes.string
}

export default CardHeader

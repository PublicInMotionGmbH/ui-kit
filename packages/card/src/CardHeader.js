import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/shared'

const moduleName = prefix('card')

/**
 * Component which card header.
 *
 * @param {object} props
 * @param {*} [props.children]
 * @param {string} [props.className]
 * @param {string} [props.title]
 * @returns {React.Element}
 */
function CardHeader (props) {
  const { children, className, title, ...passedProps } = props

  const mappedChildren = React.Children.map(children, child => {
    return typeof child === 'string' ? <span>{child}</span> : child
  })
  return (
    <div className={cls(`${moduleName}--header`, className)} {...passedProps}>
      {title ? (
        <div className={`${moduleName}--title`}>
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

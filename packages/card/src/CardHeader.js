import React from 'react'
import PropTypes from 'prop-types'

import { prefix, buildClassName } from '@talixo/shared'

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

  const clsName = buildClassName([ 'card', 'header' ], className)
  const titleClsName = prefix('card', 'title')

  const mappedChildren = React.Children.map(children, child => {
    return typeof child === 'string' ? <span>{child}</span> : child
  })
  return (
    <div className={clsName} {...passedProps}>
      {title ? (
        <div className={titleClsName}>
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

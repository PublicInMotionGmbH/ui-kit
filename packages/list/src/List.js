import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/commons'

const name = prefix('list')

/**
 * Component which represents List.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function List (props) {
  const { bullet, children, className, style, ...passedProps } = props

  const mappedChildren = React.Children.map(children, child => {
    return (
      <li>
        <span>{bullet}</span>
        {child}
      </li>
    )
  })
  return (
    <ul className={cls(name, className)} {...passedProps} style={style}>
      {mappedChildren}
    </ul>
  )
}

List.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Bullet type */
  bullet: PropTypes.node,

  /** Children */
  children: PropTypes.node,

  /** CSS styles */
  style: PropTypes.object
}

export default List

import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/shared'

const moduleName = prefix('list')

/**
 * Component which represents List.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string|*} [props.bullet]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function List (props) {
  const { bullet, children, className, ...passedProps } = props

  const mappedChildren = React.Children.map(children, child => (
    <li>
      <span className={`${moduleName}__bullet`}>{bullet}</span>
      <span className={`${moduleName}__content`}>{child}</span>
    </li>
  ))

  return (
    <ul className={cls(moduleName, className)} {...passedProps}>
      {mappedChildren}
    </ul>
  )
}

List.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Bullet to put before */
  bullet: PropTypes.node,

  /** List of elements */
  children: PropTypes.node
}

List.defaultProps = {
  bullet: '-'
}

export default List

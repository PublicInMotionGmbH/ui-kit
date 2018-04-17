import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

/**
 * Component which represents heading in typography.
 *
 * @param {object} props
 * @param {number} [props.level]
 * @param {string} [props.className]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function Heading (props) {
  const { className, level, children, ...passedProps } = props

  return React.createElement(
    `h${level}`,
    { className: buildClassName('heading', className), ...passedProps },
    children
  )
}

Heading.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Heading level */
  level: PropTypes.oneOf([ 1, 2, 3, 4, 5, 6 ]),

  /** Heading content */
  children: PropTypes.node
}

Heading.defaultProps = {
  level: 2
}

export default Heading

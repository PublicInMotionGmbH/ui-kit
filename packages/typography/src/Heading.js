import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Heading level */
  level: PropTypes.oneOf([ 1, 2, 3, 4, 5, 6 ]),

  /** Heading content */
  children: PropTypes.node
}

const defaultProps = {
  level: 2
}

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

Heading.propTypes = propTypes
Heading.defaultProps = defaultProps

export default Heading

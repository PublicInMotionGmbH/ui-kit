import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Code which should be shown there */
  children: PropTypes.node,

  /** Code language, ignored for now */
  language: PropTypes.string
}

/**
 * Component which represents code in typography.
 * TODO: Make possibility of syntax highlighting with optional dependency.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.children]
 * @param {string|*} [props.secondary]
 * @returns {React.Element}
 */
function Code (props) {
  const { className, children, ...passedProps } = props

  return (
    <code className={buildClassName('code', className)} {...passedProps}>
      {children}
    </code>
  )
}

Code.propTypes = propTypes

export default Code

import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Nodes to put inside footer */
  children: PropTypes.node
}

export const moduleName = 'form-footer'

/**
 * Component which represents footer in form.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function FormFooter (props) {
  const { className, children, ...passedProps } = props

  const clsName = buildClassName(moduleName, className)

  return (
    <footer className={clsName} {...passedProps}>
      {children}
    </footer>
  )
}

FormFooter.propTypes = propTypes

export default FormFooter

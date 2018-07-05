import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Content of header */
  children: PropTypes.node
}

/**
 * Component which represents modal header.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function ModalHeader (props) {
  const { children, className, ...rest } = props

  const modalClasses = buildClassName('modal-header', className)

  return (
    <header className={modalClasses} {...rest}>
      {children}
    </header>
  )
}

ModalHeader.propTypes = propTypes

export default ModalHeader

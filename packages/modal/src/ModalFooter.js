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
 * Component which represents modal footer.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function ModalFooter (props) {
  const { children, className, ...rest } = props

  const modalClasses = buildClassName('modal-footer', className)

  return (
    <footer className={modalClasses} {...rest}>
      {children}
    </footer>
  )
}

ModalFooter.propTypes = propTypes

export default ModalFooter

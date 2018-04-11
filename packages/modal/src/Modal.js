import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { Portal } from '@talixo/portal'

/**
 * Component which represents modal.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.children]
 * @param {boolean} [props.open]
 * @returns {React.Element}
 */
function Modal (props) {
  const { children, className, open, attachTo, ...rest } = props

  const backdropClasses = buildClassName('modal-backdrop', null, {
    entered: open,
    exiting: !open
  })

  const modalClasses = buildClassName('modal', className)

  return (
    <div>
      <Portal attachTo={attachTo}>
        <div className={backdropClasses}>
          <div className={modalClasses} {...rest}>
            {children}
          </div>
        </div>
      </Portal>
    </div>
  )
}

Modal.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Content of modal */
  children: PropTypes.node,

  /** Controls whether modal is open */
  open: PropTypes.bool,

  /** Root element of modal */
  attachTo: PropTypes.object
}

Modal.defaultProps = {
  open: false
}

export default Modal

import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { Portal } from '@talixo/portal'

export const moduleName = 'modal'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Content of modal */
  children: PropTypes.node,

  /** Handles clicking on backdrop. */
  onClick: PropTypes.func,

  /** Controls whether modal is open */
  open: PropTypes.bool,

  /** Root element of modal */
  attachTo: PropTypes.object,

  /** Is this modal simple and informational? */
  informational: PropTypes.bool,

  /** Icon to show in informational modal */
  icon: PropTypes.node,

  /** Modal type */
  type: PropTypes.oneOf([ 'error', 'success', 'info', 'warning' ])
}

const defaultProps = {
  open: false,
  informational: false
}

/**
 * Component which represents modal.
 *
 * @param {object} props
 * @param {function} [props.onClick]
 * @param {boolean} props.open
 * @param {boolean} props.informational
 * @param {string} [props.className]
 * @param {*} [props.children]
 * @param {*} [props.icon]
 * @param {HTMLElement} [props.attachTo]
 * @returns {React.Element}
 */
function Modal (props) {
  const { children, className, open, onClick, attachTo, informational, icon, type, ...rest } = props

  const backdropClasses = buildClassName('modal-backdrop', null, {
    entered: open,
    exiting: !open
  }, [ type ])

  const modalClasses = buildClassName('modal', className, { informational }, [ type ])
  const contentClasses = buildClassName('modal-content')

  const backdropClick = e => {
    if (e.target !== e.currentTarget) { return }
    if (onClick) {
      onClick(e)
    }
  }

  const iconElement = informational && icon ? (
    <div className={buildClassName('modal-icon')}>
      {icon}
    </div>
  ) : null

  return (
    <Portal attachTo={attachTo}>
      <div onClick={backdropClick} className={backdropClasses}>
        <div className={modalClasses} {...rest}>
          {iconElement}
          <div className={contentClasses}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}

Modal.propTypes = propTypes
Modal.defaultProps = defaultProps

export default Modal

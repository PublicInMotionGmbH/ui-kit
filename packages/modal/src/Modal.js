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

  /** Handles pressing escape key. */
  onEscKeyDown: PropTypes.func,

  /** Handles clicking on backdrop. */
  onOverlayClick: PropTypes.func,

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
 * @property {object} props
 * @property {function} [props.onOverlayClick]
 * @property {function} [props.onEscKeyDown]
 * @property {boolean} props.open
 * @property {boolean} props.informational
 * @property {string} [props.className]
 * @property {*} [props.children]
 * @property {*} [props.icon]
 * @property {HTMLElement} [props.attachTo]
 * @class
 */
class Modal extends React.Component {
  componentDidMount () {
    this.reinitializeEscListener(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.reinitializeEscListener(nextProps)
  }

  componentWillUnmount () {
    this.removeEscListener()
  }

  /**
   * Make sure that we have or removed unneeded esc key listener.
   *
   * @param {object} props
   */
  reinitializeEscListener (props) {
    if (props.onEscKeyDown) {
      this.addEscListener()
    } else {
      this.removeEscListener()
    }
  }

  /**
   * Add event listener for pressing escape key.
   */
  addEscListener () {
    if (!this.escEventAdded) {
      this.escEventAdded = true
      document.addEventListener('keydown', this.handleEscKeyDown)
    }
  }

  /**
   * Remove event listener for pressing escape key.
   */
  removeEscListener () {
    if (this.escEventAdded) {
      this.escEventAdded = false
      document.removeEventListener('keydown', this.handleEscKeyDown)
    }
  }

  /**
   * Handles pressing Escape key.
   * @param {Event|SyntheticEvent} e
   */
  handleEscKeyDown = (e) => {
    const conditions =
      !!this.props.onEscKeyDown &&
      this.props.open &&
      !e.isDefaultPrevented &&
      e.keyCode === 27

    if (conditions) {
      this.props.onEscKeyDown(e)
    }
  }

  handleOverlayClick = (e) => {
    if (e.target !== e.currentTarget) { return }

    if (this.props.onOverlayClick) {
      this.props.onOverlayClick(e)
    }
  }

  render () {
    const { attachTo, children, className, open, onEscKeyDown, onOverlayClick, informational, icon, type, ...rest } = this.props

    const modalClasses = buildClassName('modal', className, { informational }, [ type ])
    const contentClasses = buildClassName('modal-content')
    const backdropClasses = buildClassName('modal-backdrop', null, {
      entered: open,
      exiting: !open
    }, [ type ])

    const iconElement = informational && icon ? (
      <div className={buildClassName('modal-icon')}>
        {icon}
      </div>
    ) : null

    return (
      <Portal attachTo={attachTo}>
        <div className={backdropClasses} onClick={this.handleOverlayClick}>
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
}

Modal.displayName = 'Modal'

Modal.propTypes = propTypes
Modal.defaultProps = defaultProps

export default Modal

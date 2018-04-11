import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import Portal from './Portal'

/**
 * Component which represents modal.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {*} [props.children]
 * @property {boolean} [props.open]
 *
 * @property {object} state
 * @property {boolean} state.open
 *
 * @class
 */
class Modal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: props.open
    }
    this.toggleOpen = this.toggleOpen.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ open: nextProps.open })
  }

  toggleOpen () {
    this.setState({ open: !this.state.open })
  }

  render () {
    const { children, className, open, attachTo, ...rest } = this.props

    const backdropClasses = buildClassName(`modal-backdrop`, null, {
      entered: this.state.isOpen,
      exiting: !this.state.isOpen
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

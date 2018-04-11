import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

/**
 * Component which represents modal portal.
 *
 * @property {object} props
 * @property {Element} [props.root]
 * @property {*} [props.children]
 * @class
 */
class ModalPortal extends React.Component {
  constructor (props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount () {
    const { root } = this.props
    root.appendChild(this.el)
  }

  componentWillUnmount () {
    const { root } = this.props
    root.removeChild(this.el)
  }

  render () {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

ModalPortal.propTypes = {
  /** Anything that can be displayed inside a portal */
  children: PropTypes.node,

  /** Portal root node */
  root: PropTypes.object
}

/**
 * Component which represents modal.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {*} [props.children]
 * @property {boolean} [props.isOpen]
 *
 * @property {object} state
 * @property {boolean} state.isOpen
 *
 * @class
 */
class Modal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: props.isOpen
    }
    this.toggleOpen = this.toggleOpen.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ isOpen: nextProps.isOpen })
  }

  toggleOpen () {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render () {
    const { children, className, isOpen, root, ...rest } = this.props

    const backdropClasses = buildClassName(`modal-backdrop`, null, {
      entered: this.state.isOpen,
      exiting: !this.state.isOpen
    })

    const modalClasses = buildClassName('modal', className)

    return (
      <div>
        <ModalPortal root={root}>
          <div className={backdropClasses}>
            <div className={modalClasses} {...rest}>
              {children}
            </div>
          </div>
        </ModalPortal>
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
  isOpen: PropTypes.bool,

  /** Root element of modal */
  root: PropTypes.object
}

Modal.defaultProps = {
  isOpen: false
}

export default Modal

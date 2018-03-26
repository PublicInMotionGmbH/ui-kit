import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/commons'

const moduleName = prefix('modal')

const modalRoot = document.querySelector('body')

/**
 * Component which represents modal portal.
 *
 * @param {object} props
 * @param {*} [props.children]
 * @returns {React.Element}
 */
class ModalPortal extends React.Component {
  constructor (props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount () {
    modalRoot.appendChild(this.el)
  }

  componentWillUnmount () {
    modalRoot.removeChild(this.el)
  }

  render () {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

/**
 * Component which represents modal.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.children]
 * @param {boolean} [props.isOpen]
 * @param {string} [props.size]
 * @param {object} [props.style]
 * @returns {React.Element}
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
    const { children, className, size, style, isOpen, ...rest } = this.props
    const backdropClasses = cls(prefix('modal-backdrop'), {
      [`${prefix('modal-backdrop')}--entered`]: this.state.isOpen,
      [`${prefix('modal-backdrop')}--exiting`]: !this.state.isOpen
    })
    const modalClasses = cls(moduleName, className, {
      [prefix(`modal--${size}`)]: size.length > 0
    })

    return (
      <div>
        <ModalPortal>
          <div className={backdropClasses}
          >
            <div
              className={modalClasses}
              {...rest}
            >
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

  /** Size of the modal ('small', 'medium', 'large') */
  size: PropTypes.oneOf([
    '',
    'small',
    'medium',
    'large'
  ])
}

Modal.defaultProps = {
  isOpen: false,
  size: ''
}

export default Modal

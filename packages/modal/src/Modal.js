import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/commons'

const name = prefix('modal')

const modalRoot = document.querySelector('body')

/**
 * Component which represents modal.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {node} [props.children]
 * @param {boolean} [props.isOpen]
 * @param {string} [props.size]
 * @param {object} [props.style]
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
    const { children, className, size, style } = this.props
    return (
      <div>
        <ModalPortal>
          <div className={cls(prefix('modal--backdrop'), { entered: this.state.isOpen, exiting: !this.state.isOpen })}>
            <div
              className={cls(name, className, {
                [prefix(`modal--${size}`)]: size !== undefined
              })}
              style={style}
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
  size: PropTypes.string,

  /** Additional styles */
  style: PropTypes.object
}

Modal.defaultProps = {
  isOpen: false
}

export default Modal

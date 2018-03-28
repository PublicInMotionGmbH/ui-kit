import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/commons'

const moduleName = prefix('modal')

/**
 * Component which represents modal portal.
 *
 * @param {object} props
 * @param {*} [props.children]
 * @param {object} [props.root]
 * @returns {React.Element}
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
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.children]
 * @param {boolean} [props.isOpen]
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
    const { children, className, isOpen, root, ...rest } = this.props
    const backdropClasses = cls(`${moduleName}-backdrop`, {
      [`${moduleName}-backdrop--entered`]: this.state.isOpen,
      [`${moduleName}-backdrop--exiting`]: !this.state.isOpen
    })
    const modalClasses = cls(moduleName, className)

    return (
      <div>
        <ModalPortal root={root}>
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

  /** Root element of modal */
  root: PropTypes.object
}

Modal.defaultProps = {
  isOpen: false
}

export default Modal

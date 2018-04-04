import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import Portal from './Portal'

import { prefix } from '@talixo/shared'

const moduleName = prefix('modal')

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
    const backdropClasses = cls(`${moduleName}-backdrop`, {
      [`${moduleName}-backdrop--entered`]: this.state.open,
      [`${moduleName}-backdrop--exiting`]: !this.state.open
    })
    const modalClasses = cls(moduleName, className)

    return (
      <div>
        <Portal attachTo={attachTo}>
          <div className={backdropClasses}
          >
            <div
              className={modalClasses}
              {...rest}
            >
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

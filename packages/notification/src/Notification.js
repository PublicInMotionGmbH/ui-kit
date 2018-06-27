import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName, prefix } from '@talixo/shared'
import { Icon } from '@talixo/icon'

const propTypes = {
  /** Notification content */
  children: PropTypes.node,

  /** Additional class name passed to notification */
  className: PropTypes.string,

  /** Function that runs when close button is clicked */
  onClose: PropTypes.func,

  /** Notification type */
  type: PropTypes.oneOf([ 'toast', 'primary', 'secondary', 'tertiary', 'success', 'error', 'warning', 'info' ])
}

/**
 * Component which represents Notification.
 *
 * @param {object} props
 * @param {*} [props.children]
 * @param {string} [props.className]
 * @param {function} [props.onClose]
 * @param {string} [props.type]
 * @returns {React.Element}
 */
function Notification (props) {
  const { children, className, onClose, type, ...passedProps } = props

  const clsNames = buildClassName('notification', className, [ type ])

  return (
    <div className={clsNames} {...passedProps}>
      <div className={buildClassName('notification__content')}>
        {children}
      </div>
      <Icon
        name='close'
        className={prefix('notification', 'close')}
        onClick={onClose}
      />
    </div>
  )
}

Notification.propTypes = propTypes

export default Notification

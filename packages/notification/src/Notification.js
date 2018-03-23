import React from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'
import { prefix } from '@talixo/commons'
import Icon from '@talixo/icon'

const name = prefix('notification')

/**
 * Component which represents Notification.
 *
 * @param {object} props
 * @param {string} [props.children]
 * @param {string} [props.className]
 * @param {string} [props.onClick]
 * @param {string} [props.style]
 * @param {string} [props.variant]
 * @returns {React.Element}
 */
const Notification = props => {
  const { children, className, onClick, style, variant } = props
  const mappedChildren = React.Children.map(children, child => {
    return typeof child === 'string' ? <span>{child}</span> : child
  })
  return (
    <div
      className={cls(name, className, {
        [`${name}--${variant}`]: variant !== undefined
      })}
      style={style}
    >
      {mappedChildren}
      <Icon name='close' className='close' onClick={onClick} />
    </div>
  )
}

Notification.propTypes = {
  /** Notification content */
  children: PropTypes.node,

  /** Additional class name passed to notifications */
  className: PropTypes.string,

  /** Function that runs when close button is clicked */
  onClick: PropTypes.func,

  /** Additional styles passed to notifications */
  style: PropTypes.object,

  /** Notification variant */
  variant: PropTypes.string
}

Notification.defaultProps = {
}

export default Notification

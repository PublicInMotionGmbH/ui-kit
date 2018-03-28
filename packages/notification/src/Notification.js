import React from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'
import { prefix } from '@talixo/shared'
import Icon from '@talixo/icon'

const name = prefix('notification')

/**
 * Component which represents Notification.
 *
 * @param {object} props
 * @param {string} [props.children]
 * @param {string} [props.className]
 * @param {string} [props.handleRemove]
 * @param {string} [props.style]
 * @param {string} [props.variant]
 * @returns {React.Element}
 */
const Notification = props => {
  const { children, className, handleRemove, style, variant, ...passedProps } = props
  const classNames = cls(name, className, {
    [`${name}--${variant}`]: variant !== undefined
  })

  return (
    <div className={classNames} style={style} {...passedProps}>
      {children}
      <Icon name='close' className='close' onClick={handleRemove} />
    </div>
  )
}

Notification.propTypes = {
  /** Notification content */
  children: PropTypes.node,

  /** Additional class name passed to notification */
  className: PropTypes.string,

  /** Function that runs when close button is clicked */
  handleRemove: PropTypes.func,

  /** Additional styles passed to notification */
  style: PropTypes.object,

  /** Notification variant */
  variant: PropTypes.string
}

Notification.defaultProps = {
}

export default Notification

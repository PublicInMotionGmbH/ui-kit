import React from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'
import { prefix } from '@talixo/shared'
import Icon from '@talixo/icon'

const moduleName = prefix('notification')

/**
 * Component which represents Notification.
 *
 * @param {object} props
 * @param {*} [props.children]
 * @param {string} [props.className]
 * @param {function} [props.handleRemove]
 * @param {string} [props.variant]
 * @returns {React.Element}
 */
const Notification = props => {
  const { children, className, handleRemove, variant, ...passedProps } = props

  const clsNames = cls(moduleName, className, {
    [`${moduleName}--${variant}`]: variant
  })

  return (
    <div className={clsNames} {...passedProps}>
      {children}
      <Icon name='close' className={`${moduleName}--close`} onClick={handleRemove} />
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

  /** Notification variant */
  variant: PropTypes.oneOf([ 'primary', 'success', 'error', 'warning', 'information' ])
}

export default Notification
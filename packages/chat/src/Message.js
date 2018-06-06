import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name. */
  className: PropTypes.string,

  /** User name. */
  user: PropTypes.string,

  /** Message content. */
  message: PropTypes.node,

  /** Message time stamp. */
  time: PropTypes.number
}

const defaultProps = {}

function Message (props) {
  const { className, message, user, time, ...passedProps } = props

  function renderTime () {
    const fromNow = moment(time).fromNow()
    const hoursMinutes = moment(time).format('HH:mm')
    return `${fromNow} ${hoursMinutes}`
  }

  const infoClsName = buildClassName([className, 'info'])
  const timeClsName = buildClassName([className, 'time'])
  const userClsName = buildClassName([className, 'user'])
  const messageClsName = buildClassName([className, 'message'])

  return (
    <div className={className} {...passedProps}>
      <div className={infoClsName}>
        <span className={timeClsName}>
          {renderTime()}
        </span>
        <span className={userClsName}>{user}</span>
      </div>
      <span className={messageClsName}>{message}</span>
    </div>
  )
}

Message.propTypes = propTypes

Message.defaultProps = defaultProps

export default Message

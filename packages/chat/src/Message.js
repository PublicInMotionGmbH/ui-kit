import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name. */
  className: PropTypes.string,

  /** User name. */
  name: PropTypes.string,

  /** Message content. */
  message: PropTypes.node,

  /** Message time stamp. */
  time: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

const defaultProps = {}

function renderTime (time) {
  const fromNow = moment(time).fromNow()
  const hoursMinutes = moment(time).format('HH:mm')
  return `${fromNow} ${hoursMinutes}`
}

function Message (props) {
  const { className, message, name, time, ...passedProps } = props

  const infoClsName = buildClassName([className, 'info'])
  const timeClsName = buildClassName([className, 'time'])
  const nameClsName = buildClassName([className, 'name'])
  const messageClsName = buildClassName([className, 'message'])

  return (
    <div className={className} {...passedProps}>
      <div className={infoClsName}>
        <span className={timeClsName}>
          {renderTime(time)}
        </span>
        <span className={nameClsName}>{name}</span>
      </div>
      <span className={messageClsName}>{message}</span>
    </div>
  )
}

Message.propTypes = propTypes

Message.defaultProps = defaultProps

export default Message

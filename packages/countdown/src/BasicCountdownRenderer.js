import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName, prefix } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Number of days left */
  days: PropTypes.number.isRequired,

  /** Number of hours left */
  hours: PropTypes.number.isRequired,

  /** Number of minutes left */
  minutes: PropTypes.number.isRequired,

  /** Number of seconds left */
  seconds: PropTypes.number.isRequired,

  /** Is this count-down finished? */
  finished: PropTypes.bool
}

/**
 * Format number to have preceding zeroes.
 *
 * @param {number} num
 * @returns {string}
 */
function formatNumber (num) {
  if (isNaN(num)) {
    return '00'
  }

  if (num < 10) {
    return '0' + num
  }

  return '' + num
}

/**
 * Render basic countdown.
 *
 * @param {object} props
 * @param {number} props.days
 * @param {number} props.hours
 * @param {number} props.minutes
 * @param {number} props.seconds
 * @param {boolean} [props.finished]
 * @param {string} [props.className]
 *
 * @returns {React.Element}
 */
function BasicCountdownRenderer (props) {
  const {
    days, hours, minutes, seconds, finished, className,
    time, targetDate, ...passedProps
  } = props

  // Build class names
  const clsName = buildClassName('countdown', className, { finished })
  const daysClsName = prefix('countdown', 'days')
  const hoursClsName = prefix('countdown', 'hours')
  const minutesClsName = prefix('countdown', 'minutes')
  const secondsClsName = prefix('countdown', 'seconds')

  return (
    <span className={clsName} {...passedProps}>
      <span className={daysClsName}>{formatNumber(days)}</span>
      :<span className={hoursClsName}>{formatNumber(hours)}</span>
      :<span className={minutesClsName}>{formatNumber(minutes)}</span>
      :<span className={secondsClsName}>{formatNumber(seconds)}</span>
    </span>
  )
}

BasicCountdownRenderer.propTypes = propTypes

export default BasicCountdownRenderer

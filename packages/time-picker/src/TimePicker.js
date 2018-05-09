import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { formatTime } from '../utils/time'
import { timeData } from '../utils/timeData'

import TimeInput from './TimeInput'
import TimeMenu from './TimeMenu'

export const moduleName = 'time-picker'

const propTypes = {
  /** Additional class name. */
  className: PropTypes.string,

  /** Event called after input value has been changed */
  onChange: PropTypes.func,

  /** Time type */
  type: PropTypes.oneOf(['12', '24'])
}

const defaultProps = {
  type: '24'
}

/**
 * Component which represents Time Picker.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {function} [props.onChange]
 * @property {string} [props.type]
 *
 * @property {object} state
 * @property {string} [state.time]
 *
 * @class
 */
class TimePicker extends React.PureComponent {
  state = {
    time: ''
  }

  componentDidUpdate (prevProps, prevState) {
    const { onChange } = this.props
    const { time } = this.state

    if (prevState.time !== time && onChange) {
      onChange(time)
    }
  }

  buildMenuHour = (rest) => {
    const { type } = this.props
    const { hours, hoursAM, hoursPM } = timeData

    return type === '12'
      ? [
        <TimeMenu key='hours-am' data={hoursAM} {...rest} />,
        <TimeMenu key='hours-pm' data={hoursPM} {...rest} />
      ]
      : (<TimeMenu data={hours} {...rest} />)
  }

  buildMenuMinutes = (rest) => {
    const { minutes } = timeData

    return (<TimeMenu data={minutes} {...rest} />)
  }

  handleChange = (value) => {
    const { onChange } = this.props
    const { time: prevTime } = this.state

    const time = formatTime(value, prevTime)
    this.setState({ time })

    if (onChange) {
      onChange(time)
    }
  }

  render () {
    const { className, onChange, type, ...passedProps } = this.props
    const { buildMenuHour, buildMenuMinutes, handleChange } = this

    const wrapperClsName = buildClassName(moduleName, className)
    const inputHourClsName = buildClassName([moduleName, 'input-hour'])
    const inputMinutesClsName = buildClassName([moduleName, 'input-minutes'])
    const colonClsName = buildClassName([moduleName, 'colon'])

    return (
      <div className={wrapperClsName} {...passedProps}>
        <TimeInput
          className={inputHourClsName}
          menuComponent={buildMenuHour}
          onChange={handleChange}
          format='h'
          type={type}
        />
        <span className={colonClsName}>:</span>
        <TimeInput
          className={inputMinutesClsName}
          menuComponent={buildMenuMinutes}
          onChange={handleChange}
          format='m'
          type={type}
        />
      </div>
    )
  }
}

TimePicker.propTypes = propTypes

TimePicker.defaultProps = defaultProps

export default TimePicker

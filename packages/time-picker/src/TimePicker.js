import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { formatTimeValue } from '../utils/time'
import { timeData } from '../utils/timeData'

import TimeInput from './TimeInput'
import TimeMenu from './TimeMenu'

export const moduleName = 'time-picker'

const propTypes = {
  /** Additional class name. */
  className: PropTypes.string,

  /** Event called after input value has been changed. */
  onChange: PropTypes.func,

  /** Time type. */
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
 * @property {string} [state.h]
 * @property {string} [state.m]
 *
 * @class
 */
class TimePicker extends React.PureComponent {
  state = {
    h: '',
    m: ''
  }

  /**
   * Fire function passed to onChange if state.time changes
   * and onChange function is passed to element.
   *
   * @param {object} props
   * @param {string|null} [props.time]
   */
  componentDidUpdate (prevProps, prevState) {
    const { onChange } = this.props
    const { h, m } = this.state

    if ((prevState.h !== h || prevState.m !== m) && onChange) {
      const time = isNaN(h) || isNaN(m)
        ? null
        : `${h}:${m}`

      onChange(time)
    }
  }

  /**
   * Build menu with hours.
   *
   * @param {object} rest
   * @returns {array|React.Element}
   */
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

  /**
   * Build menu with minutes.
   *
   * @param {object} rest
   * @returns {React.Element}
   */
  buildMenuMinutes = (rest) => {
    const { minutes } = timeData

    return (<TimeMenu data={minutes} {...rest} />)
  }

  /**
   * Handle input change.
   *
   * @param {object} value
   */
  handleChange = (value) => {
    // Format time output
    const output = formatTimeValue(value)

    this.setState({ [value.format]: output })
  }

  /**
   * Render TimeInput components wrapped in a div.
   *
   * @returns {React.Element}
   */
  render () {
    const { className, onChange, type, ...passedProps } = this.props
    const { buildMenuHour, buildMenuMinutes, handleChange } = this

    // Build class names
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

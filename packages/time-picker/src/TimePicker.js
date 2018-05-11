import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { buildClassName } from '@talixo/shared'
import { Icon } from '@talixo/icon'

import TimeInput from './TimeInput'
import TimeMenu from './TimeMenu'

export const moduleName = 'time-picker'

const propTypes = {
  /** Additional class name. */
  className: PropTypes.string,

  /** Event called after input value has been changed. */
  onChange: PropTypes.func,

  /** Hour format. */
  hourFormat: PropTypes.oneOf(['HH', 'hh A']),

  /** Time string passed to component. */
  value: PropTypes.string
}

const defaultProps = {
  hourFormat: 'HH'
}

const HOURS_24 = 'HH'
const MINUTES = 'mm'

/**
 * Component which represents header for AM time.
 *
 * @returns {React.Element}
 */
const HeaderAM = () => [
  <Icon key='icon-am' name='brightness_3' />,
  <span key='label-am' style={{ marginLeft: '8px' }}>AM</span>
]

/**
 * Component which represents header for PM time.
 *
 * @returns {React.Element}
 */
const HeaderPM = () => [
  <Icon key='icon-pm' name='brightness_5' />,
  <span key='label-pm' style={{ marginLeft: '8px' }}>PM</span>
]

/**
 * Component which represents header for AM time.
 * @property {object} props
 *
 * @returns {React.Element}
 */
const TimeMenuHour24 = (props) => {
  const { format, onValueSelect } = props

  // Create array of hour values
  const data = new Array(24)
    .fill(null)
    .map((_, i) => i)

  return (
    <TimeMenu
      columns={4}
      data={data}
      format={format}
      onValueSelect={onValueSelect}
    />
  )
}

/**
 * Component which represents header for AM time.
 * @property {object} props
 *
 * @returns {React.Element}
 */
const TimeMenuHour12 = (props) => {
  const { format, onValueSelect } = props

  // Create array of hour values
  const dataAM = new Array(12)
    .fill(null)
    .map((_, i) => i)

  // Create array of hour values
  const dataPM = new Array(12)
    .fill(null)
    .map((_, i) => i + 12)

  return [
    <TimeMenu
      key='hours-am'
      columns={2}
      data={dataAM}
      format={format}
      onValueSelect={onValueSelect}
    >
      <HeaderAM />
    </TimeMenu>,
    <TimeMenu
      key='hours-pm'
      columns={2}
      data={dataPM}
      format={format}
      onValueSelect={onValueSelect}
    >
      <HeaderPM />
    </TimeMenu>
  ]
}

/**
 * Build menu with hours.
 *
 * @param {object} rest
 * @returns {array|React.Element}
 */
const buildMenuHours = (handleHoursBlur, hourFormat) => {
  return hourFormat === HOURS_24
    ? <TimeMenuHour24
      format={hourFormat}
      onValueSelect={handleHoursBlur}
    />
    : <TimeMenuHour12
      format={hourFormat}
      onValueSelect={handleHoursBlur}
    />
}

/**
 * Build menu with minutes.
 *
 * @param {object} rest
 * @returns {React.Element}
 */
const buildMenuMinutes = (handleMinutesBlur) => {
  // Create array of minutes values
  const data = new Array(12)
    .fill(null)
    .map((_, i) => i * 5)

  return (
    <TimeMenu
      columns={2}
      format=':mm'
      data={data}
      onValueSelect={handleMinutesBlur}
    />
  )
}

/**
 * Component which represents time picker.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {string} [props.hourFormat]
 * @property {function} [props.onChange]
 * @property {string} [props.type]
 *
 * @property {object} state
 * @property {object} [state.value]
 *
 * @class
 */
class TimePicker extends React.PureComponent {
  state = {
    value: moment(this.props.value)
  }

  /**
   * Fire function passed to onChange if state.value changes
   * and onChange function is passed to element.
   *
   * @param {object} props
   * @param {object} [props.value]
   */
  componentDidUpdate (prevProps, prevState) {
    const { onChange } = this.props
    const { value } = this.state

    if (prevState.value !== value && onChange) {
      // Format value to 'HH:mm' format
      const formattedValue = moment(value).format('HH:mm')
      onChange(formattedValue)
    }
  }

  /**
   * Handle input change.
   *
   * @param {object} value
   */
  handleHoursBlur = (inputValue, suffix) => {
    const { value: prevValue } = this.state

    // Add 12 hours to 'AM' time
    const formattedValue = suffix === 'PM'
      ? parseInt(inputValue) + 12
      : inputValue

    // Format time output
    const value = prevValue
      .clone()
      .hour(formattedValue)

    this.setState({ value })
  }

  /**
   * Handle input change.
   *
   * @param {object} value
   */
  handleMinutesBlur = (inputValue) => {
    const { value: prevValue } = this.state

    // Format time output
    const value = prevValue
      .clone()
      .minute(inputValue)

    this.setState({ value })
  }

  /**
   * Render TimeInput components wrapped in a div.
   *
   * @returns {React.Element}
   */
  render () {
    const { className, hourFormat, onChange, value: propsValue, ...passedProps } = this.props
    const { value } = this.state
    const { handleHoursBlur, handleMinutesBlur } = this

    // Build class names
    const wrapperClsName = buildClassName(moduleName, className)
    const inputHourClsName = buildClassName([moduleName, 'input-hour'])
    const inputMinutesClsName = buildClassName([moduleName, 'input-minutes'])
    const menuClsName = buildClassName([ moduleName, 'menu' ])
    const colonClsName = buildClassName([moduleName, 'colon'])

    return (
      <div className={wrapperClsName} {...passedProps}>
        <TimeInput
          className={inputHourClsName}
          onBlur={handleHoursBlur}
          format={hourFormat}
          value={value}
        >
          <div className={menuClsName}>
            {buildMenuHours(handleHoursBlur, hourFormat)}
          </div>
        </TimeInput>
        <span className={colonClsName}>:</span>
        <TimeInput
          className={inputMinutesClsName}
          onBlur={handleMinutesBlur}
          format={MINUTES}
          value={value}
        >
          <div className={menuClsName}>
            {buildMenuMinutes(handleMinutesBlur)}
          </div>
        </TimeInput>
      </div>
    )
  }
}

TimePicker.propTypes = propTypes

TimePicker.defaultProps = defaultProps

export default TimePicker

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
  hourFormat: PropTypes.oneOf(['24', '12']),

  /** Time string in 'HH:mm' format passed to component. */
  value: PropTypes.string,

  /** ID passed to control element */
  id: PropTypes.string
}

const defaultProps = {
  hourFormat: '24'
}

const HOURS_24 = 'HH'
const HOURS_12 = 'hh A'
const MINUTES = 'mm'

/**
 * Component which represents header for AM time.
 *
 * @returns {React.Element}
 */
const HeaderAM = () => [
  <Icon key='icon-am' name='moon_outline' />,
  <span key='label-am' style={{ marginLeft: '8px' }}>AM</span>
]

/**
 * Component which represents header for PM time.
 *
 * @returns {React.Element}
 */
const HeaderPM = () => [
  <Icon key='icon-pm' name='sun_outline' />,
  <span key='label-pm' style={{ marginLeft: '8px' }}>PM</span>
]

/**
 * Component which represents header for AM time.
 * @property {object} props
 *
 * @returns {React.Element}
 */
const TimeMenuHour24 = (props) => {
  const { data, format, onValueSelect, value } = props

  return (
    <TimeMenu
      columns={4}
      data={data}
      format={format}
      onValueSelect={onValueSelect}
      value={value}
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
  const { dataAM, dataPM, format, onValueSelect, value } = props

  return [
    <TimeMenu
      key='hours-am'
      columns={2}
      data={dataAM}
      format={format}
      onValueSelect={onValueSelect}
      value={value}
    >
      <HeaderAM />
    </TimeMenu>,
    <TimeMenu
      key='hours-pm'
      columns={2}
      data={dataPM}
      format={format}
      onValueSelect={onValueSelect}
      value={value}
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
const buildMenuHours = (value, handleHoursBlur, format) => {
  // Create array of hour values
  const data = new Array(24)
    .fill(null)
    .map((_, i) => i)

  // Create array of hour values
  const dataAM = new Array(12)
    .fill(null)
    .map((_, i) => i)

  // Create array of hour values
  const dataPM = new Array(12)
    .fill(null)
    .map((_, i) => i + 12)

  return format === HOURS_24
    ? <TimeMenuHour24
      data={data}
      value={value}
      format={format}
      onValueSelect={handleHoursBlur}
    />
    : <TimeMenuHour12
      dataAM={dataAM}
      dataPM={dataPM}
      value={value}
      format={format}
      onValueSelect={handleHoursBlur}
    />
}

/**
 * Build menu with minutes.
 *
 * @param {object} rest
 * @returns {React.Element}
 */
const buildMenuMinutes = (value, handleMinutesBlur) => {
  // Create array of minutes values
  const data = new Array(12)
    .fill(null)
    .map((_, i) => i * 5)

  return (
    <TimeMenu
      value={value}
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
 * @property {string} [props.value]
 *
 * @property {object} state
 * @property {object} [state.value]
 *
 * @class
 */
class TimePicker extends React.PureComponent {
  state = {
    value: this.props.value ? moment(this.props.value, 'HH:mm') : moment()
  }

  /**
  * Update current value in component state,
  * when value is controlled.
  *
  * @param {object} props
  * @param {object} [props.value]
  */
  componentWillReceiveProps (props) {
    if (props.value !== this.props.value && props.value !== undefined) {
      const value = moment(props.value, 'HH:mm')
      this.setState({ value })
    }
  }

  /**
   * Handle input change.
   *
   * @param {object} value
   */
  handleHoursBlur = (inputValue, suffix) => {
    const { hourFormat, onChange } = this.props
    const { value: prevValue } = this.state
    let formattedValue

    // If hour format is 'AM/PM' we need to convert 12 to 0. This is because moment treats 0 as 12am and 12 as 12pm
    formattedValue = hourFormat === '12' && inputValue === '12'
      ? '0'
      : inputValue

    // Add 12 hours to 'AM' time
    formattedValue = suffix === 'PM'
      ? parseInt(formattedValue) + 12
      : formattedValue

    // Format time output
    const value = prevValue
      .clone()
      .hour(formattedValue)

    // Stop when nothing has changed
    if (+prevValue === +value) {
      return
    }

    this.setState({ value })

    if (onChange) {
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
  handleMinutesBlur = (inputValue) => {
    const { onChange } = this.props
    const { value: prevValue } = this.state

    // Format time output
    const value = prevValue
      .clone()
      .minute(inputValue)

    // Stop when nothing has changed
    if (+prevValue === +value) {
      return
    }

    this.setState({ value })

    if (onChange) {
      // Format value to 'HH:mm' format
      const formattedValue = moment(value).format('HH:mm')
      onChange(formattedValue)
    }
  }

  /**
   * Render TimeInput components wrapped in a div.
   *
   * @returns {React.Element}
   */
  render () {
    const { className, hourFormat, onChange, value: propsValue, id, ...passedProps } = this.props
    const { value } = this.state

    // Build class names
    const wrapperClsName = buildClassName(moduleName, className)
    const inputHourClsName = buildClassName([moduleName, 'input-hour'])
    const inputMinutesClsName = buildClassName([moduleName, 'input-minutes'])
    const menuClsName = buildClassName([ moduleName, 'menu' ])
    const colonClsName = buildClassName([moduleName, 'colon'])

    // Convert format token
    const format = hourFormat === '24'
      ? HOURS_24
      : HOURS_12

    return (
      <div className={wrapperClsName} {...passedProps}>
        <TimeInput
          id={id}
          className={inputHourClsName}
          onBlur={this.handleHoursBlur}
          format={format}
          value={value}
        >
          <div className={menuClsName}>
            {buildMenuHours(value, this.handleHoursBlur, format)}
          </div>
        </TimeInput>
        <span className={colonClsName}>:</span>
        <TimeInput
          className={inputMinutesClsName}
          onBlur={this.handleMinutesBlur}
          format={MINUTES}
          value={value}
        >
          <div className={menuClsName}>
            {buildMenuMinutes(value, this.handleMinutesBlur)}
          </div>
        </TimeInput>
      </div>
    )
  }
}

TimePicker.propTypes = propTypes

TimePicker.defaultProps = defaultProps

export default TimePicker

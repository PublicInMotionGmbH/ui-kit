import React from 'react'
import PropTypes from 'prop-types'
import 'react-dates/initialize'

import moment from 'moment'

import { SingleDatePicker } from 'react-dates'

import { buildClassName } from '@talixo/shared'

const moduleName = 'calendar'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Display date format */
  displayFormat: PropTypes.string,

  /** Day aria label format */
  dayAriaLabelFormat: PropTypes.string,

  /** Month format */
  monthFormat: PropTypes.string,

  /** Phrases */
  phrases: PropTypes.object,

  /** Placeholder text */
  placeholder: PropTypes.string,

  /** Week day format */
  weekDayFormat: PropTypes.string
}

const defaultProps = {
  displayFormat: 'YYYY-MM-DD'
}

/**
 * Component which represents Calendar.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {string} [props.displayFormat]
 * @property {string} [props.placeholder]
 * @class {React.Element}
 */
class Calendar extends React.PureComponent {
  state = {
    date: moment(this.props.value),
    focused: false
  }

  /**
   * Update state when value is provided by props.
   *
   * @param {object} props
   */
  componentWillReceiveProps (props) {
    if (props.value != null) {
      this.setState({ date: moment(props.value) })
    }
  }

  /**
   * Request changing date.
   *
   * @param {*} date
   */
  onDateChange = (date) => {
    const { value, onChange } = this.props

    if (value == null) {
      this.setState({ date })
    }

    if (onChange) {
      onChange(date)
    }
  }
  /**
   * Call onFocus/onBlur events when calendar status is changed.
   *
   * @param {boolean} focused
   */
  onFocusChange = ({ focused }) => {
    this.setState({ focused })

    const handler = focused ? this.props.onFocus : this.props.onBlur

    if (handler) {
      handler()
    }
  }

  render () {
    const {
      className, dayAriaLabelFormat, displayFormat, monthFormat, phrases,
      placeholder, weekDayFormat, onChange, onBlur, onFocus, ...passedProps
    } = this.props
    const { date, focused } = this.state

    const clsName = buildClassName(moduleName, className)

    return (
      <div className={clsName} {...passedProps}>
        <SingleDatePicker
          date={date}
          dayAriaLabelFormat={dayAriaLabelFormat}
          displayFormat={displayFormat}
          focused={focused}
          monthFormat={monthFormat}
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
          phrases={phrases}
          placeholder={placeholder || null}
          weekDayFormat={weekDayFormat}
        />
      </div>
    )
  }
}

Calendar.propTypes = propTypes
Calendar.defaultProps = defaultProps

export default Calendar

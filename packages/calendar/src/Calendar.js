import React from 'react'
import PropTypes from 'prop-types'
import 'react-dates/initialize'

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
  displayFormat: 'D MMM YYYY'
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
  constructor (props) {
    super(props)
    this.state = {
      date: null,
      focused: false
    }
    this.onDateChange = this.onDateChange.bind(this)
    this.onFocusChange = this.onFocusChange.bind(this)
  }
  /**
   * Set new date
   * @param {*} date
   */
  onDateChange (date) {
    this.setState({ date })
  }
  /**
   * Change property focused when focus
   * @param {boolean} focused
   */
  onFocusChange ({ focused }) {
    this.setState({ focused })
  }

  render () {
    const { className, dayAriaLabelFormat, displayFormat, monthFormat, phrases, placeholder, weekDayFormat, ...passedProps } = this.props
    const { date, focused } = this.state

    const clsName = buildClassName(moduleName, className)

    return (
      <div className={clsName} {...passedProps} >
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

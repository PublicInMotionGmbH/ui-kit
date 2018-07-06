import React from 'react'
import PropTypes from 'prop-types'
import 'react-dates/initialize'

import moment from 'moment'
import { Icon } from '@talixo/icon'

import SingleDatePicker from 'react-dates/lib/components/SingleDatePicker'

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
  weekDayFormat: PropTypes.string,

  /** Which day of week is first? */
  firstDayOfWeek: PropTypes.number,

  /** Moment.js object or formatted value */
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),

  /** Event handler when date is changed */
  onChange: PropTypes.func,

  /** Event handler when calendar is focused */
  onFocus: PropTypes.func,

  /** Event handler when calendar has lost focus */
  onBlur: PropTypes.func,

  /** ID passed to control element */
  id: PropTypes.string,

  /** Does it have error? */
  error: PropTypes.bool
}

const defaultProps = {
  displayFormat: 'YYYY-MM-DD',
  firstDayOfWeek: 1,
  error: false
}

/**
 * Component which represents Calendar.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {string} [props.displayFormat]
 * @property {string} [props.placeholder]
 *
 * @property {number} [updateTimeout]
 * @class
 */
class Calendar extends React.PureComponent {
  state = {
    date: this.props.value == null ? null : moment(this.props.value),
    focused: false
  }

  componentWillUnmount () {
    clearTimeout(this.updateTimeout)
  }

  /**
   * Update state when value is provided by props.
   *
   * @param {object} props
   */
  componentWillReceiveProps (props) {
    if (props.value != null && props.value !== this.props.value) {
      this.setState({ date: moment(props.value) })
    }
  }

  /**
   * Request changing date.
   *
   * @param {*} date
   */
  onDateChange = (date) => {
    const _date = this.state.date

    const previousDate = _date && _date.isValid() ? _date.format('YYYY-MM-DD') : null
    const nextDate = date && date.isValid() ? date.format('YYYY-MM-DD') : null

    if (previousDate === nextDate) {
      return
    }

    this.setState({ date })
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

    // Unfortunately, SingleDatePicker is blurring immediately after sending event of change.
    // We have to update date on blur, because of other SingleDatePicker problems (especially value input)
    if (!focused) {
      this.updateTimeout = setTimeout(this.updateDateAfterBlur)
    }
  }

  updateDateAfterBlur = () => {
    const { value, onChange } = this.props
    const { date } = this.state
    const nextDate = date && date.isValid() ? date.format('YYYY-MM-DD') : null

    if (value === undefined) {
      this.setState({ date: moment(this.props.value) })
    }

    if (nextDate !== value && onChange) {
      onChange(nextDate)
    }
  }

  render () {
    const {
      className, dayAriaLabelFormat, displayFormat, monthFormat, phrases, id, error,
      placeholder, weekDayFormat, onChange, onBlur, onFocus, firstDayOfWeek, ...passedProps
    } = this.props
    const { date, focused } = this.state

    const clsName = buildClassName(moduleName, className, { focused, error })

    return (
      <div className={clsName} {...passedProps}>
        <SingleDatePicker
          hideKeyboardShortcutsPanel
          id={id}
          date={date}
          dayAriaLabelFormat={dayAriaLabelFormat}
          displayFormat={displayFormat}
          focused={focused}
          firstDayOfWeek={firstDayOfWeek}
          monthFormat={monthFormat}
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
          phrases={phrases}
          placeholder={placeholder || null}
          transitionDuration={0}
          weekDayFormat={weekDayFormat}
          navPrev={<Icon name='keyboard_arrow_left' />}
          navNext={<Icon name='keyboard_arrow_right' />}
        />
      </div>
    )
  }
}

Calendar.propTypes = propTypes
Calendar.defaultProps = defaultProps

export default Calendar

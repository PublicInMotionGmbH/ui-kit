import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import 'react-dates/initialize'
import momentPropTypes from 'react-moment-proptypes'
import moment from 'moment'

import { SingleDatePicker } from 'react-dates'

import { prefix } from '@talixo/shared'

const name = prefix('calendar')

/**
 * Component which represents Calendar.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
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

  onDateChange (date) {
    this.setState({ date })
  }

  onFocusChange ({ focused }) {
    this.setState({ focused })
  }

  render () {
    const { className, displayFormat, isRTL, ...passedProps } = this.props
    const { date, focused } = this.state
    return (
      <div className={cls(className, name)} {...passedProps} >
        <SingleDatePicker
          date={date}
          focused={focused}
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
          isRTL={isRTL}
          displayFormat={displayFormat}
        />
      </div>
    )
  }
}

Calendar.propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

Calendar.defaultProps = {
  displayFormat: 'D MMM YYYY',
  isRTL: false
}

export default Calendar

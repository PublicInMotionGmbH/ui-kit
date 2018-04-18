import React from 'react'
import PropTypes from 'prop-types'
import 'react-dates/initialize'
import moment from 'moment'

import { SingleDatePicker } from 'react-dates'

import { buildClassName } from '@talixo/shared'

const moduleName = 'calendar'

/**
 * Component which represents Calendar.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.displayFormat]
 * @param {string} [props.lang]
 * @param {string} [props.placeholder]
 * @param {boolean} [props.isRTL]
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
    this.onChangeLang = this.onChangeLang.bind(this)
  }

  onDateChange (date) {
    this.setState({ date })
  }

  onFocusChange ({ focused }) {
    this.setState({ focused })
  }

  onChangeLang () {
    moment.locale('en')
    if (this.props.lang !== undefined) {
      moment.locale(`${this.props.lang}`)
    }
  }

  componentDidMount () {
    this.onChangeLang()
  }

  componentWillReceiveProps () {
    this.onChangeLang()
  }

  render () {
    const { className, displayFormat, isRTL, lang, placeholder, ...passedProps } = this.props
    const { date, focused } = this.state

    const clsName = buildClassName(moduleName, className)

    return (
      <div className={clsName} {...passedProps} lang={lang}>
        <SingleDatePicker
          date={date}
          focused={focused}
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
          isRTL={isRTL}
          displayFormat={displayFormat}
          placeholder={placeholder || null}
        />
      </div>
    )
  }
}

Calendar.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /* Dispaly date format */
  displayFormat: PropTypes.string,

  /** Language */
  lang: PropTypes.string,

  /** Placeholder text */
  placeholder: PropTypes.string,

  /** Text RTL  */
  isRTL: PropTypes.bool
}

Calendar.defaultProps = {
  displayFormat: 'D MMM YYYY',
  lang: 'en',
  isRTL: false
}

export default Calendar

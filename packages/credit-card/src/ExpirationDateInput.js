import React from 'react'
import PropTypes from 'prop-types'

import RangeInput from './RangeInput'

import { buildClassName } from '@talixo/shared'

const moduleName = 'expiration-date-input'

const propTypes = {
  /** Additional class name passed to wrapper. */
  className: PropTypes.string,

  /** Handler for onChange event. */
  onChange: PropTypes.func,

  /** Value to be displayed inside inputs. */
  value: PropTypes.shape({
    month: PropTypes.number,
    year: PropTypes.number
  }),

  /** ID passed to control element */
  id: PropTypes.string,

  /** Does it have error? */
  error: PropTypes.bool
}

const defaultProps = {
  error: false
}

// Set minimum year to be the current year.
const minYear = new Date().getFullYear()
// Set maximum year to be 40 years from the current year.
const maxYear = minYear + 40

/**
 * Component which represents expiration date input.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {func} [props.onChange]
 * @property {object} [props.value]
 * @property {number} [props.value.month]
 * @property {number} [props.value.year]
 *
 * @property {object} state
 * @property {object|null} state.value
 * @property {object|null} state.month
 * @property {object|null} state.year
 *
 * @class
 */
class ExpirationDateInput extends React.PureComponent {
  state = {
    value: this.props.value || null,
    month: this.props.value && this.props.value.month ? this.props.value.month : null,
    year: this.props.value && this.props.value.year ? this.props.value.year : null
  }

  /**
   * Update current value in component state,
   * when value is controlled.
   *
   * @param {object} props
   */
  componentWillReceiveProps (props) {
    const { value } = props

    // If passed value is undefined or the same as in current state, return.
    if (value == null || value === undefined) { return }
    if (value === this.state.value) { return }

    const { value: { month, year } } = props

    // If passed month or year are different than in current state, change them.
    if (month !== this.state.month) { value.month = month }
    if (year !== this.state.year) { value.year = year }

    this.setState({ value })
  }

  /**
   * Handle month input change.
   *
   * @param {number} month
   */
  changeMonth = (month) => {
    const { year } = this.state

    this.setState({ month })

    this.change({
      month,
      year
    })
  }

  /**
   * Handle year input change.
   *
   * @param {number} year
   */
  changeYear = (year) => {
    const { month } = this.state

    this.setState({ year })

    this.change({
      month,
      year
    })
  }

  /**
   * Handle change.
   *
   * @param {object} value
   */
  change (value) {
    const { onChange } = this.props
    const nextValue = value && value.month && value.year
      ? { month: value.month, year: value.year }
      : null

    if (this.props.value !== undefined) {
      this.setState({
        value: nextValue
      })
    }

    if (onChange) {
      onChange(nextValue)
    }
  }

  /**
   * Render expiration date input component.
   *
   * @returns {React.Element}
   */
  render () {
    const { className, id, error, onChange, value, ...passedProps } = this.props
    const { month, year } = this.state

    // Build class names.
    const wrapperClsName = buildClassName(moduleName, className, { error })
    const monthClsName = buildClassName([ moduleName, 'month' ])
    const yearClsName = buildClassName([ moduleName, 'year' ])

    return (
      <div className={wrapperClsName} {...passedProps}>
        <RangeInput
          className={monthClsName}
          autoComplete='cc-exp-month'
          id={id}
          error={error}
          min={1}
          max={12}
          minLength={2}
          placeholder='MM'
          value={month || null}
          onChange={this.changeMonth}
        />

        <RangeInput
          className={yearClsName}
          autoComplete='cc-exp-year'
          error={error}
          min={minYear}
          max={maxYear}
          autoCompleteLength={2}
          placeholder='YYYY'
          value={year || null}
          onChange={this.changeYear}
        />
      </div>
    )
  }
}

ExpirationDateInput.propTypes = propTypes

ExpirationDateInput.defaultProps = defaultProps

export default ExpirationDateInput

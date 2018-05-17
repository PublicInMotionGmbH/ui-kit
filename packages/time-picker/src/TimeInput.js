import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { buildClassName } from '@talixo/shared'
import { Icon } from '@talixo/icon'
import { TextInput } from '@talixo/text-input'

export const moduleName = 'time-picker'

const A_KEY = 65
const P_KEY = 80

const propTypes = {
  /** Additional class name. */
  className: PropTypes.string,

  /** Event called after input has lost focus. */
  onBlur: PropTypes.func,

  /** Format of time. */
  format: PropTypes.oneOf(['HH', 'hh A', 'mm']).isRequired,

  /** Time object. */
  value: PropTypes.object.isRequired
}

const defaultProps = {
}

const HOURS_24 = 'HH'
const HOURS_12 = 'hh A'
const MINUTES = 'mm'

/**
 * Component which represents time input
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {function} [props.onBlur]
 * @property {string} [props.format]
 * @property {object} [props.value]
 *
 * @property {object} state
 * @property {boolean} [state.open]
 * @property {string} [state.inputValue]
 * @property {string|null} [state.suffix]
 *
 * @class
 */
class TimeInput extends React.Component {
  state = {
    open: false,
    inputValue: '',
    suffix: null
  }

  componentDidMount () {
    this.formatValue(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.value !== nextProps.value || this.props.format !== nextProps.format) {
      this.formatValue(nextProps)
    }
  }

  /**
   * Formats value to desired format.
   *
   * @param {object} props
   * @returns {React.Element}
   */
  formatValue = (props) => {
    const { format, value } = props

    // Format value according to provided format
    const inputValue = format === HOURS_12
      ? moment(value).format('h')
      : moment(value).format(format)

    // Format suffix if needed
    let suffix = format !== HOURS_12
      ? null
      : moment(value).format('A')

    this.setState({ inputValue, suffix })
  }

  /**
   * Build control arrow.
   *
   * @returns {React.Element}
   */
  buildControl = () => {
    const { open } = this.state

    // Build class name for arrow
    const arrowClsName = buildClassName([ moduleName, 'input' ], null, 'arrow')

    return (
      <span className={arrowClsName}>
        <Icon name={open ? 'expand_less' : 'expand_more'} />
      </span>
    )
  }

  /**
   * Handles input value change.
   *
   * @param {string} value
   */
  handleChange = (value) => {
    const { format } = this.props

    // Parse value
    const parsedValue = isNaN(parseInt(value))
      ? 0
      : parseInt(value)

    let inputValue

    // Format value within desired range
    switch (format) {
      case HOURS_24:
        inputValue = Math.min(23, Math.max(0, parsedValue))
        break
      case HOURS_12:
        inputValue = Math.min(12, Math.max(0, parsedValue))
        break
      case MINUTES:
        inputValue = Math.min(59, Math.max(0, parsedValue))
        break
      default:
        inputValue = value
    }

    inputValue = inputValue === 0
      ? ''
      : inputValue.toString()

    this.setState({ inputValue })
  }

  /**
   * Handles input blur.
   */
  handleBlur = () => {
    const { onBlur } = this.props
    const { inputValue, suffix } = this.state

    if (onBlur) {
      onBlur(inputValue, suffix)
    }

    this.setState({ open: false })
  }

  /**
   * Handles input focus.
   */
  handleFocus = () => {
    this.setState({ open: true })
  }

  /**
   * Handle keyboard events on input.
   *
   * @param {SyntheticEvent|Event} event
   */
  handleInputKeyDown = (event) => {
    const { format } = this.props
    // If format is differnet than 'hh A' - return
    if (format !== HOURS_12) { return }

    // Prevent propagation if 'a' key is pressed and change suffix to 'AM'
    if (event.which === A_KEY) {
      event.stopPropagation()
      let suffix = 'AM'
      this.setState({ suffix })
    }

    // Prevent propagation if 'p' key is pressed and change suffix to 'PM'
    if (event.which === P_KEY) {
      event.stopPropagation()
      let suffix = 'PM'
      this.setState({ suffix })
    }
  }

  /**
   * Render input.
   *
   * @returns {React.Element}
   */
  renderInput = () => {
    const { inputValue, open, suffix } = this.state

    // Build class name for input
    const inputClsName = buildClassName([ moduleName, 'input' ], null, { open })

    return (
      <TextInput
        className={inputClsName}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleInputKeyDown}
        right={this.buildControl()}
        type='number'
        suffix={suffix}
        value={inputValue}
        autoComplete='off'
      />
    )
  }

  render () {
    const { className, children, format, onBlur, value, ...passedProps } = this.props
    const { open } = this.state

    // Build class name for wrapper
    const wrapperClsName = buildClassName([ moduleName, 'input' ], className)

    return (
      <div className={wrapperClsName} {...passedProps}>
        {this.renderInput()}
        {open && children}
      </div>
    )
  }
}

TimeInput.propTypes = propTypes

TimeInput.defaultProps = defaultProps

export default TimeInput

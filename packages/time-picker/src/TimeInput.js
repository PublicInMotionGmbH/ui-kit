import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { buildClassName } from '@talixo/shared'
import { Icon } from '@talixo/icon'
import { TextInput } from '@talixo/text-input'

export const moduleName = 'time-input'

const A_KEY = 65
const P_KEY = 80

const propTypes = {
  /** Additional class name. */
  className: PropTypes.string,

  /** Event called after input has lost focus. */
  onBlur: PropTypes.func,

  /** Event called after input value has been changed. */
  onChange: PropTypes.func,

  /** Format of time. */
  format: PropTypes.oneOf(['HH', 'hh A', 'mm']).isRequired,

  /** Time object. */
  value: PropTypes.object
}

const defaultProps = {
}

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
    const { open } = this.state
    this.formatValue(nextProps)
    if (open) { this.setState({ open: false }) }
  }

  /**
   * Formats value to desired format.
   * @property {object} props
   *
   * @returns {React.Element}
   */
  formatValue = (props) => {
    const { format, value } = props

    const inputValue = format === 'hh A'
      ? moment(value).format('h')
      : moment(value).format(format)

    let suffix = format !== 'hh A'
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

    const arrowClsName = buildClassName([ moduleName, 'arrow' ])

    return (
      <span className={arrowClsName} onClick={this.toggleMenu}>
        <Icon name={open ? 'expand_less' : 'expand_more'} />
      </span>
    )
  }

  /**
   * Handles input value change.
   * @property {string} value
   *
   */
  handleChange = (value) => {
    const { format } = this.props
    const parsedValue = isNaN(parseInt(value))
      ? 0
      : parseInt(value)

    let inputValue
    switch (format) {
      case 'HH':
        inputValue = Math.min(parsedValue, 23)
        break
      case 'hh A':
        inputValue = Math.min(parsedValue, 12)
        break
      case 'mm':
        inputValue = Math.min(parsedValue, 59)
        break
      default:
        inputValue = value
    }

    this.setState({ inputValue })
  }

  /**
   * Handle keyboard events on input.
   *
   * @param {SyntheticEvent|Event} event
   */
  handleInputKeyDown = (event) => {
    const { format } = this.props
    if (format !== 'hh A') { return }

    if (event.which === A_KEY) {
      event.stopPropagation()
      let suffix = 'AM'
      this.setState({ suffix })
    }

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
    const { onBlur } = this.props
    const { inputValue, open, suffix } = this.state

    const inputClsName = buildClassName([ moduleName, 'input' ], null, {open})

    return (
      <TextInput
        className={inputClsName}
        onChange={this.handleChange}
        onBlur={() => onBlur(inputValue, suffix)}
        onKeyDown={this.handleInputKeyDown}
        right={this.buildControl()}
        type='text'
        suffix={suffix}
        value={inputValue}
      />
    )
  }

  /**
   * Toggle menu.
   */
  toggleMenu = () => {
    this.setState(state => ({ open: !state.open }))
  }

  render () {
    const { className, children, format, onBlur, onChange, value, ...passedProps } = this.props
    const { open } = this.state

    const wrapperClsName = buildClassName(moduleName, className)

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

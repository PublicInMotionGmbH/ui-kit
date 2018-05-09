import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Icon } from '@talixo/icon'
import { TextInput } from '@talixo/text-input'

import { formatInputValue, formatOutput, getAp, getTime } from '../utils/time'

export const moduleName = 'time-input'

const propTypes = {
  /** Additional class name. */
  className: PropTypes.string,

  /** Menu component. */
  menuComponent: PropTypes.func.isRequired,

  /** Event called after input value has been changed. */
  onChange: PropTypes.func,

  /** Format of time. */
  format: PropTypes.oneOf(['h', 'm']).isRequired,

  /** Time type. */
  type: PropTypes.oneOf(['12', '24']).isRequired
}

const defaultProps = {
}

/**
 * Component which represents Time Input.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {*} [props.menuComponent]
 * @property {*} [props.onChange]
 * @property {string} [props.format]
 * @property {string} [props.type]
 *
 * @property {object} state
 * @property {boolean} [state.isOpen]
 * @property {string} [state.inputValue]
 * @property {object} [state.time]
 *
 * @class
 */
class TimeInput extends React.PureComponent {
  state = {
    isOpen: false,
    inputValue: '',
    time: getTime(this.props.type)[this.props.format]
  }

  componentDidMount () {
    const { onChange } = this.props
    const { time } = this.state
    const inputValue = time.value

    this.setState({ inputValue })

    if (onChange) {
      onChange(time)
    }
  }

  /**
   * Fire function passed to onChange if state.time changes
   * and onChange function is passed to element.
   *
   * @param {object} props
   * @param {object} [props.time]
   */
  componentDidUpdate (prevProps, prevState) {
    const { onChange } = this.props
    const { time } = this.state

    if (prevState.time !== time && onChange) {
      onChange(time)
    }
  }

  /**
   * Build control arrow.
   *
   * @returns {React.Element}
   */
  buildControl = () => {
    const { isOpen } = this.state
    const { toggleMenu } = this

    const arrowClsName = buildClassName([ moduleName, 'arrow' ])

    return (
      <span className={arrowClsName} onClick={toggleMenu}>
        <Icon name={isOpen ? 'expand_less' : 'expand_more'} />
      </span>
    )
  }

  /**
   * Handle menu change.
   *
   * @param {object} time
   */
  handleMenuChange = (time) => {
    const inputValue = time.value

    this.setState({ inputValue, isOpen: false, time })
  }

  /**
   * Handle input blur.
   */
  handleInputBlur = () => {
    const { format, type } = this.props
    const { inputValue: prevInputValue } = this.state

    const ap = getAp(prevInputValue, format, type)

    let inputValue = parseFloat(prevInputValue)
    if (prevInputValue === '') { inputValue = 0 }
    if (inputValue < 10) { inputValue = '0' + inputValue.toString() }

    const time = formatOutput(inputValue, type, ap, format)

    this.setState({ inputValue, time })
  }

  /**
   * Handle input change.
   *
   * @param {string} value
   */
  handleInputChange = (value) => {
    const { format, type } = this.props
    const { inputValue: prevInputValue } = this.state

    const ap = getAp(value, format, type)

    let inputValue = formatInputValue(format, value, prevInputValue, type)

    const time = formatOutput(inputValue, type, ap, format)

    this.setState({ inputValue, time })
  }

  /**
   * Toggle menu.
   */
  toggleMenu = () => {
    this.setState(state => ({ isOpen: !state.isOpen }))
  }

  /**
   * Render menu component.
   *
   * @returns {React.Element}
   */
  renderMenu = () => {
    const { menuComponent: MenuComponent } = this.props
    const { handleMenuChange } = this

    const menuClsName = buildClassName([ moduleName, 'menu' ])

    return (
      <div className={menuClsName}>
        <MenuComponent onValueSelect={handleMenuChange} />
      </div>
    )
  }

  /**
   * Render input.
   *
   * @returns {React.Element}
   */
  renderValue = () => {
    const { format, type } = this.props
    const { inputValue, isOpen, time } = this.state
    const { buildControl, handleInputBlur, handleInputChange } = this

    const inputClsName = buildClassName([ moduleName, 'input' ], null, {open: isOpen})

    const ap = time && time.ap
      ? time.ap
      : null

    const suffix = type === '24' || format === 'm'
      ? null
      : ap === 'p'
        ? 'PM'
        : 'AM'

    return (
      <TextInput
        className={inputClsName}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        right={buildControl()}
        suffix={suffix}
        type='text'
        value={inputValue}
      />
    )
  }

  /**
   * Render TextInput and menu wrapped in div.
   *
   * @returns {React.Element}
   */
  render () {
    const { className, menuComponent, onChange, ...passedProps } = this.props
    const { isOpen } = this.state
    const { renderMenu, renderValue } = this

    const wrapperClsName = buildClassName(moduleName, className)

    return (
      <div className={wrapperClsName} {...passedProps}>
        {renderValue()}
        {isOpen && renderMenu()}
      </div>
    )
  }
}

TimeInput.propTypes = propTypes

TimeInput.defaultProps = defaultProps

export default TimeInput

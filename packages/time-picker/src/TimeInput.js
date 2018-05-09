import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Icon } from '@talixo/icon'
import { TextInput } from '@talixo/text-input'

import { formatOutput, getTime } from '../utils/time'

export const moduleName = 'time-input'

const propTypes = {
  /** Additional class name. */
  className: PropTypes.string,

  /** Menu component */
  menuComponent: PropTypes.func.isRequired,

  /** Event called after input value has been changed */
  onChange: PropTypes.func,

  /** Format of time. */
  format: PropTypes.oneOf(['h', 'm']).isRequired,

  /** Time type */
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

  componentDidUpdate (prevProps, prevState) {
    const { onChange } = this.props
    const { time } = this.state

    if (prevState.time !== time && onChange) {
      onChange(time)
    }
  }

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

  handleMenuChange = (time) => {
    const inputValue = time.value

    this.setState({ inputValue, isOpen: false, time })
  }

  handleInputChange = (value) => {
    const { format, type } = this.props
    const { inputValue: prevInputValue } = this.state

    const v = value === ''
      ? ''
      : parseInt(value)

    let ap
    if (format === 'h' && type === '24') {
      ap = v <= 11
        ? 'a'
        : 'p'
    }

    const inputValue = isNaN(v) ? prevInputValue : v
    const time = formatOutput(inputValue, type, ap, format)

    this.setState({ inputValue, time })
  }

  toggleMenu = () => {
    this.setState(state => ({ isOpen: !state.isOpen }))
  }

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

  renderValue = () => {
    const { format, type } = this.props
    const { inputValue, isOpen, time } = this.state
    const { buildControl, handleInputChange } = this

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
        onChange={handleInputChange}
        right={buildControl()}
        suffix={suffix}
        type='text'
        value={inputValue}
      />
    )
  }

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

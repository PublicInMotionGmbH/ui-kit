import React from 'react'
import PropTypes from 'prop-types'

import { RadioInput } from '@talixo/radio-input'
import { TextInput } from '@talixo/text-input'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Enable custom option. */
  allowCustom: PropTypes.bool,

  /** Additional class name. */
  className: PropTypes.string,

  /** Component which will be displayed as custom option. */
  customComponent: PropTypes.func,

  /** Placeholder of default custom options input. */
  customPlaceholder: PropTypes.string,

  /** Is this value incorrect? */
  error: PropTypes.bool,

  /** Name of radio group. */
  name: PropTypes.string.isRequired,

  /** onChange callback. */
  onChange: PropTypes.func,

  /** Array of objects which represent options */
  options: PropTypes.arrayOf(PropTypes.shape({
    /** Indicates if option should be disabled. */
    disabled: PropTypes.bool,

    /** Option label. */
    label: PropTypes.node.isRequired,

    /** Value it represents */
    value: PropTypes.any.isRequired
  })),

  /** Option selected by user. Self-controlled by default. */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),

  /** Idicates if options should be positioned vertically. */
  vertical: PropTypes.bool
}

const defaultProps = {
  allowCustom: false,
  vertical: false
}

/**
 * Component which represents RadioGroup.
 *
 * @property {object} props
 * @property {boolean} [props.allowCustom]
 * @property {string} [props.className]
 * @property {Element|ReactElement} [props.customComponent]
 * @property {string} [props.customPlaceholder]
 * @property {boolean} [props.error]
 * @property {string} props.name
 * @property {function} [props.onChange]
 * @property {array} props.options
 * @property {array} [props.options.disabled]
 * @property {array} props.options.label
 * @property {array} props.options.value
 * @property {number|string} [props.value]
 * @property {boolean} [props.vertical]
 *
 * @property {object} state
 * @property {number|string} state.custom
 * @property {number|string} state.value
 * @class
 */
class RadioGroup extends React.PureComponent {
  state = {
    custom: '',
    value: this.props.value
  }

  /**
   * Update value in state if props.value has changed.
   *
   * @param {object} prevProps
   */
  componentWillReceiveProps (nextProps) {
    if (nextProps.value != null && nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value })
    }
  }

  /**
   * Handles chenges of input group.
   *
   * @param {number|string} value
   * @param {boolean} checked
   * @param {Event|StyntheticEvent} e
   */
  onChange = (value, checked, e) => {
    if (!checked) {
      return
    }

    if (this.props.value == null) {
      this.setState({ value })
    }

    if (this.props.onChange) {
      this.props.onChange(value, e)
    }
  }

  /**
   * Generates custom radio option.
   *
   * @returns {Element|React.Element}
   */
  generateCustomOption = () => {
    const { customComponent, customPlaceholder, error, name } = this.props
    const { custom, value } = this.state
    const { onChange } = this

    const OptionComponent = customComponent || TextInput

    const change = (e, ...args) => {
      const value = e.target ? e.target.value : e
      this.setState({ custom: value })
      onChange(value, true, e)
    }

    const focus = (e, ...args) => {
      onChange(custom, true, e)
    }

    return (
      <RadioInput
        checked={value === custom}
        error={error}
        name={name}
        onChange={onChange.bind(this, custom)}
      >
        <OptionComponent
          placeholder={customPlaceholder}
          onChange={change}
          onFocus={focus}
        />
      </RadioInput>
    )
  }

  /**
   * Generates list of radio inputs.
   *
   * @returns {Element[]|React.Element[]}
   */
  generateOptions = () => {
    const { error, name, options } = this.props
    const { value } = this.state

    const optionsList = options.map(obj => (
      <RadioInput
        checked={value === obj.value}
        disabled={obj.disabled || false}
        key={obj.value}
        name={name}
        onChange={this.onChange.bind(this, obj.value)}
        error={error}
        value={obj.value}
      >
        { obj.label }
      </RadioInput>
    ))
    return optionsList
  }

  render () {
    const { allowCustom, className, customComponent, customPlaceholder,
      error, name, onChange, options, value, vertical, ...passedProps
    } = this.props
    const { generateCustomOption, generateOptions } = this
    const wrapperCls = buildClassName('radio-group', className, { vertical })

    return (
      <div className={wrapperCls} {...passedProps} >
        { generateOptions() }
        { allowCustom && generateCustomOption()}
      </div>
    )
  }
}

RadioGroup.propTypes = propTypes

RadioGroup.defaultProps = defaultProps

export default RadioGroup

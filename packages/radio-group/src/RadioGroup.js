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
  customComponent: PropTypes.node,

  /** Placeholder of default custom options input. */
  customPlaceholder: PropTypes.string,

  /** Name of radio group. */
  name: PropTypes.string.isRequired,

  /** Handles changes of text input inside custom option. */
  onCustomChange: PropTypes.func,

  /** Array of objects which represent options. */
  options: PropTypes.arrayOf(PropTypes.shape({
    /** Idicates if option should be disabled. */
    disabled: PropTypes.bool,

    /** Option label. */
    label: PropTypes.node.isRequired,

    /** Value of the option. */
    value: PropTypes.any.isRequired
  })),

  /** Radio input label size ('small', 'large'). */
  size: PropTypes.oneOf([ 'small', 'large' ]),

  /** Value of default option. */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

const defaultProps = {
  allowCustom: false
}

/**
 * Component which represents RadioGroup.
 *
 * @property {object} props
 * @property {boolean} [props.allowCustom]
 * @property {string} [props.className]
 * @property {string} [props.name]
 * @property {array} [props.options]
 * @property {string} [props.size]
 * @property {number|string [props.value]
 *
 * @property {object} state
 * @property {number|string} state.value
 * @class
 */
class RadioGroup extends React.PureComponent {
  state = {
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
    const { customComponent, customPlaceholder, name, onCustomChange, size } = this.props
    const { value } = this.state
    const { onChange } = this

    return (
      <RadioInput
        checked={value === 'custom'}
        name={name}
        onChange={onChange.bind(this, 'custom')}
        size={size}
      >
        {
          customComponent
            ? React.cloneElement(customComponent, {
              onFocus: (e, ...args) => {
                onChange('custom', true, e)
                if (customComponent.props.onFocus) {
                  customComponent.props.onFocus(e, args)
                }
              }
            })
            : <TextInput
              placeholder={customPlaceholder}
              onChange={onCustomChange}
              onFocus={onChange.bind(this, 'custom', true)}
            />
        }
      </RadioInput>
    )
  }

  /**
   * Generates list of radio inputs.
   *
   * @returns {Element[]|React.Element[]}
   */
  generateOptions = () => {
    const { name, options, size } = this.props
    const { value } = this.state

    const optionsList = options.map(obj => (
      <RadioInput
        checked={value === obj.value}
        disabled={obj.disabled || false}
        key={obj.value}
        name={name}
        onChange={this.onChange.bind(this, obj.value)}
        size={size}
        value={obj.value}
      >
        {obj.label}
      </RadioInput>
    ))
    return optionsList
  }

  render () {
    const { allowCustom, className, children, customComponent,
      name, options, value, size, onChange, onCustomChange, ...passedProps
    } = this.props
    const { generateCustomOption, generateOptions } = this

    return (
      <div className={buildClassName('radio-group', className)} {...passedProps} >
        { generateOptions() }
        { allowCustom && generateCustomOption()}
      </div>
    )
  }
}

RadioGroup.propTypes = propTypes

RadioGroup.defaultProps = defaultProps

export default RadioGroup

import React from 'react'
import PropTypes from 'prop-types'

import { RadioInput } from '@talixo/radio-input'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Name of radio group */
  name: PropTypes.string.isRequired,

  /** Is this value incorrect? */
  error: PropTypes.bool,

  /** Array of objects which represent options */
  options: PropTypes.arrayOf(PropTypes.shape({
    /** Label to show */
    label: PropTypes.node.isRequired,

    /** Value it represents */
    value: PropTypes.any.isRequired,

    /** Is this option disabled? */
    disabled: PropTypes.bool
  })),

  /** Value of default option */
  value: PropTypes.any,

  /** ID passed to control element */
  id: PropTypes.string,

  /** Should it be disabled? */
  disabled: PropTypes.bool,

  /** Should it be read-only? */
  readOnly: PropTypes.bool
}

const defaultProps = {
  error: false,
  disabled: false,
  readOnly: false
}

/**
 * Component which represents RadioGroup.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {string} [props.name]
 * @property {array} [props.options]
 * @property {string} [props.size]
 * @property {string|number} [props.value]
 * @class
 */
class RadioGroup extends React.PureComponent {
  state = {
    value: this.props.value
  }

  componentWillReceiveProps (props) {
    if (props.value !== undefined && props.value !== this.state.value) {
      this.setState({ value: props.value })
    }
  }

  change (value, checked) {
    if (!checked) {
      return
    }

    if (this.props.value === undefined) {
      this.setState({ value })
    }

    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render () {
    const {
      className, children, name, options, error, value,
      onChange, id, disabled, readOnly, ...passedProps
    } = this.props
    const _value = this.state.value

    const selectedOption = options.filter(obj => _value === obj.value)[0]

    const focusableOption = selectedOption || options[0]

    const optionsList = options.map(obj => (
      <RadioInput
        id={focusableOption === obj ? id : undefined}
        checked={_value === obj.value}
        disabled={obj.disabled || disabled}
        readOnly={obj.readOnly || readOnly}
        key={obj.value}
        name={name}
        error={error}
        onChange={this.change.bind(this, obj.value)}
        value={obj.value}
      >
        {obj.label}
      </RadioInput>
    ))

    return (
      <div className={buildClassName('radio-group', className, { disabled, 'read-only': readOnly })} {...passedProps}>
        {optionsList}
      </div>
    )
  }
}

RadioGroup.displayName = 'RadioGroup'

RadioGroup.propTypes = propTypes
RadioGroup.defaultProps = defaultProps

export default RadioGroup

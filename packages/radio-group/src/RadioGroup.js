import React from 'react'
import PropTypes from 'prop-types'

import { RadioInput } from '@talixo/radio-input'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Name of radio group */
  name: PropTypes.string.isRequired,

  /** Array of objects which represent options */
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node.isRequired,
    value: PropTypes.any.isRequired,
    disabled: PropTypes.bool
  })),

  /** Radio input label size ('small', 'large') */
  size: PropTypes.oneOf([ 'small', 'large' ]),

  /** Value of default option */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
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
    const { className, children, name, options, value, size, onChange, ...passedProps } = this.props
    const _value = this.state.value

    const optionsList = options.map(obj => (
      <RadioInput
        checked={_value === obj.value}
        disabled={obj.disabled || false}
        key={obj.label}
        name={name}
        onChange={this.change.bind(this, obj.value)}
        size={size}
        value={obj.value}>
        {obj.label}
      </RadioInput>
    ))

    return (
      <div className={buildClassName('radio-group', className)} {...passedProps} >
        {optionsList}
      </div>
    )
  }
}

RadioGroup.propTypes = propTypes

export default RadioGroup

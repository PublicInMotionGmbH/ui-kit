import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { TextInput } from '@talixo/text-input'

import NumberInputStepper from './NumberInputStepper'

export const moduleName = 'number-input'

const propTypes = {
  /** Additional class name of input */
  className: PropTypes.string,

  /** Should include stepper in number input? */
  stepper: PropTypes.bool,

  /** Indicates that input has error */
  error: PropTypes.bool,

  /** Additional styling of wrapper */
  style: PropTypes.object,

  /** Initial input value */
  value: PropTypes.number,

  /** Minimum value */
  min: PropTypes.number,

  /** Maximum value */
  max: PropTypes.number,

  /** Step for mouse-wheel, keyboard and buttons */
  step: PropTypes.number,

  /** Number of decimal places */
  precision: PropTypes.number,

  /** Time in ms, in which we start automatically increasing on pressed button */
  initialTime: PropTypes.number,

  /** Time in ms, in which we make another tick when pressing a button */
  stepTime: PropTypes.number,

  /** Should it be disabled? */
  disabled: PropTypes.bool,

  /** Should it be read-only? */
  readOnly: PropTypes.bool
}

const defaultProps = {
  stepper: true,
  error: false,
  precision: 0, // buttons doesn't work correctly above 1e15 correctly (because of float numbers)
  min: -Infinity,
  max: Infinity,
  step: 1,
  initialTime: 700,
  stepTime: 20,
  disabled: false,
  readOnly: false
}

/**
 * Component which represents number input
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {object} [props.style]
 * @property {boolean} props.error
 * @property {number} props.value
 * @property {number} props.min
 * @property {number} props.max
 * @property {number} props.step
 * @property {number} props.precision
 * @property {number} props.initialTime
 * @property {number} props.stepTime
 * @property {boolean} props.disabled
 * @property {boolean} props.readOnly
 * @class
 */
class NumberInput extends React.PureComponent {
  state = {
    value: this.props.value || 0
  }

  /**
   * Update state when new props came
   *
   * @param {object} props
   * @param {object} state
   *
   * @returns {object || null}
   */
  static getDerivedStateFromProps (props, state) {
    const nextValue = props.value || 0
    if (props.value != null && nextValue !== state.value) {
      return { value: nextValue }
    } else return null
  }

  /**
   * Calculate current value from text (or number)
   *
   * @param {string|number} value
   * @returns {number}
   */
  calculate (value) {
    const { min, max, precision } = this.props

    // Floor value
    value = parseFloat((+value).toFixed(precision))

    // Make it within currently selected boundaries
    return Math.min(max, Math.max(min, value))
  }

  /**
   * Request change of the value
   *
   * @param {string} base
   * @param {number} [delta]
   */
  change = (base, delta) => {
    const { onChange } = this.props
    const { value } = this.state

    const previous = +value
    const current = this.calculate(base)
    const next = delta == null ? current : this.calculate(current + delta)

    if (next === previous) {
      return
    }

    if (this.props.value == null) {
      this.setState({ value: next })
    }

    if (onChange) {
      onChange(next)
    }
  }

  /**
   * Increment value
   */
  increment = () => {
    const { step } = this.props
    const { value } = this.state

    return this.change(value, step)
  }

  /**
   * Decrement value
   */
  decrement = () => {
    const { step } = this.props
    const { value } = this.state

    return this.change(value, -step)
  }

  onChange = (value) => {
    return this.change(value)
  }

  /**
   * Render input
   *
   * @returns {React.Element}
   */
  render () {
    const {
      className, error, stepper, onChange, precision, disabled, readOnly,
      initialTime, stepTime, right, value: _value, ...passedProps
    } = this.props
    const { value } = this.state

    const wrapperClass = buildClassName(moduleName, className, { error, stepper, disabled, 'read-only': readOnly })

    const stepperElement = stepper ? (
      <NumberInputStepper
        disabled={disabled || readOnly}
        onIncrement={this.increment}
        onDecrement={this.decrement}
        initialTime={initialTime}
        stepTime={stepTime}
      />
    ) : null

    return (
      <TextInput
        className={wrapperClass}
        type='number'
        right={stepperElement}
        onChange={this.onChange}
        value={'' + value}
        error={error}
        disabled={disabled}
        readOnly={readOnly}
        {...passedProps}
      />
    )
  }
}

NumberInput.displayName = 'NumberInput'

NumberInput.propTypes = propTypes

NumberInput.defaultProps = defaultProps

export default NumberInput

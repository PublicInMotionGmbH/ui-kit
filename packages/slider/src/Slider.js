import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'slider'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Controlled value, otherwise self-controlled */
  value: PropTypes.number,

  /** Maximum value in range */
  max: PropTypes.number,

  /** Minimum value in range */
  min: PropTypes.number,

  /** Size of each movement of the slider control */
  step: PropTypes.number,

  /** Handler fired when value is changed */
  onChange: PropTypes.func,

  /** Handler fired when input is blurred */
  onBlur: PropTypes.func,

  /** Handler fired when input is focused */
  onFocus: PropTypes.func,

  /** ID passed to control element */
  id: PropTypes.string,

  /** Should it be disabled? */
  disabled: PropTypes.bool,

  /** Should it be read-only? */
  readOnly: PropTypes.bool
}

const defaultProps = {
  min: 0,
  disabled: false,
  readOnly: false
}

/**
 * Component which represents Slider.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {number} [props.defaultValue]
 * @property {string} [props.label]
 * @property {number} [props.max]
 * @property {number} [props.min]
 * @property {number} [props.step]
 * @property {boolean} [props.disabled]
 * @property {boolean} [props.readOnly]
 *
 * @property {object} state
 * @property {number} state.value
 *
 * @class {React.Element}
 */
class Slider extends React.PureComponent {
  state = {
    value: this.props.value != null
      ? this.props.value
      : this.props.defaultValue
        ? this.props.defaultValue
        : this.props.min
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
    if (props.value != null && props.value !== state.value) {
      return { value: props.value }
    } else return null
  }

  /**
   * This function handles change of input value.
   *
   * @param {object} e
   */
  handleChange = (e) => {
    const value = +e.target.value

    if (this.props.value == null) {
      this.setState({ value })
    }

    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render () {
    const {
      className, max, min, step, value, onChange, onFocus, onBlur,
      id, disabled, readOnly, ...passedProps
    } = this.props

    const _value = this.state.value
    const clsName = buildClassName(moduleName, className, { disabled, 'read-only': readOnly })

    return (
      <span className={clsName} {...passedProps}>
        <span className={buildClassName([ moduleName, 'value' ])}>{_value}</span>
        <input
          className={buildClassName([ moduleName, 'input' ])}
          disabled={disabled}
          readOnly={readOnly}
          id={id}
          max={max}
          min={min}
          onChange={this.handleChange}
          step={step}
          type='range'
          onFocus={onFocus}
          onBlur={onBlur}
          value={_value}
        />
      </span>
    )
  }
}

Slider.displayName = 'Slider'

Slider.propTypes = propTypes
Slider.defaultProps = defaultProps

export default Slider

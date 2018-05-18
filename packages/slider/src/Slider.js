import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'slider'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Defaul value */
  defaultValue: PropTypes.number,

  /** Label for input range */
  label: PropTypes.string,

  /** Maximum value in range */
  max: PropTypes.number,

  /** Minimum value in range */
  min: PropTypes.number,

  /** Size of each movement of the slider control */
  step: PropTypes.number
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
 *
 * @property {object} state
 * @property {number} state.value
 *
 * @class {React.Element}
 */
class Slider extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.defaultValue || this.setDefaultValue()
    }
    this.handleChange = this.handleChange.bind(this)
  }

  /**
   * This function set value to be used as default
   *
   * @returns {number}
   */
  setDefaultValue () {
    const min = this.props.min || 0
    const max = this.props.max || 100

    return (max < min) ? min : min + (max - min) / 2
  }

  /**
   * This function handle change of input value
   * @param {object} e
   */
  handleChange (e) {
    this.setState({
      value: e.target.value
    })
  };

  render () {
    const { className, label, max, min, step, ...passedProps } = this.props
    const { value } = this.state
    return (
      <span className={buildClassName(moduleName, className)} {...passedProps}>
        {label && <label className={buildClassName([moduleName, 'label'])}>{label}</label>}
        <span className={buildClassName([moduleName, 'value'])}>{value}</span>
        <input
          className={buildClassName([moduleName, 'input'])}
          max={max}
          min={min}
          onChange={this.handleChange}
          step={step}
          type='range'
          value={value}
        />
      </span>
    )
  }
}

Slider.propTypes = propTypes

export default Slider

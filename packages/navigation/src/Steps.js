import React from 'react'
import PropTypes from 'prop-types'

import Step from './Step'

const propTypes = {
  /** Active step */
  current: PropTypes.number,

  /** List of steps */
  steps: PropTypes.array,

  /** Function passed to step buttons */
  onChange: PropTypes.func
}

const defaultProps = {
  current: 1,
  steps: []
}

/**
 * Component which represents Steps.
 *
 * @param {object} props
 * @param {number} [props.current]
 * @param {object[]} [props.steps]
 * @param {function} [props.onChange]
 * @returns {React.Step}
 */
function Steps (props) {
  const { current, steps, onChange, ...passedProps } = props

  return steps.map((step, i) => (
    <Step
      key={i}
      onClick={() => { onChange(i + 1) }}
      active={current === i + 1}
      disabled={current < i + 1}
      {...passedProps}
    >
      {step}
    </Step>
  ))
}

Steps.propTypes = propTypes

Steps.defaultProps = defaultProps

export default Steps

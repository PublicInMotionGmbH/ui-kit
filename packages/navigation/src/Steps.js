import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Step from './Step'

const propTypes = {
  /** Active step */
  current: PropTypes.object,

  /** List of steps */
  steps: PropTypes.arrayOf(PropTypes.object),

  /** Function passed to step buttons */
  onChange: PropTypes.func
}

const defaultProps = {
  steps: []
}

/**
 * Component which represents Steps.
 *
 * @param {object} props
 * @param {object} [props.current]
 * @param {object[]} [props.steps]
 * @param {function} [props.onChange]
 * @returns {React.Step}
 */
function Steps (props) {
  const { current, steps, onChange, ...passedProps } = props

  // Find first occuring index of current step.
  const firstIndex = _.findIndex(steps, current)

  // If index was found set it as current, if not - set it to 0.
  const currentIndex = firstIndex === -1
    ? 0
    : firstIndex

  return steps.map((step, i) => (
    <Step
      key={i}
      onClick={() => { onChange(steps[i]) }}
      active={currentIndex === i && !step.disabled}
      completed={currentIndex > i && !step.disabled}
      disabled={step.disabled}
      {...passedProps}
    >
      {step.name}
    </Step>
  ))
}

Steps.propTypes = propTypes

Steps.defaultProps = defaultProps

export default Steps

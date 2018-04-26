import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import buildCirclePath from '../utils/buildCirclePath'

/**
 * Component which represents Progress ring.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function ProgressRing (props) {
  const { className, value, type, children, ...passedProps } = props

  // Normalize current progress
  const _value = value == null || isNaN(+value)
    ? NaN
    : Math.max(0, Math.min(1, +value))

  // Build values used inside
  const valueNow = isNaN(_value) ? null : _value * 100
  const valuePath = isNaN(_value) ? 0.3 : _value

  // Build path for SVG circle
  const path = buildCirclePath(valuePath)

  // Build class name for Progress Ring
  const clsName = buildClassName('progress-ring', className, [ type ], {
    completed: _value === 1,
    indeterminate: isNaN(_value)
  })

  return (
    <span className={clsName} {...passedProps}>
      <span
        className={buildClassName([ 'progress-ring', 'progress' ])}
        role='progressbar'
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={valueNow}
      >
        <svg viewBox='-1 -1 2 2' style={{ width: '100%' }}>
          <path d={path} />
        </svg>
      </span>
      <span className={buildClassName([ 'progress-ring', 'content' ])}>
        {children}
      </span>
    </span>
  )
}

ProgressRing.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Current progress (between 0 and 1, or NaN for indeterminate) */
  value: PropTypes.number,

  /** Progress ring type */
  type: PropTypes.string,

  /** Progress ring content */
  children: PropTypes.node
}

export default ProgressRing

import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import drawStroke from './drawStroke'
import { strokeDasharray, circlePosition, circleRadius, strokeWidth, viewBox } from './constants'

const propTypes = {
  /** Progress ring content */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Current progress (between 0 and 1, or NaN for indeterminate) */
  value: PropTypes.number,

  /** Progress ring type */
  type: PropTypes.string,

  /** Value of indeterminate stroke */
  indeterminateValue: PropTypes.number
}

const defaultProps = {
  type: 'primary',
  indeterminateValue: 0.25
}

/**
 * Component which represents Progress ring.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {number} [props.value]
 * @param {number} [props.indeterminateValue]
 * @param {string} [props.type]
 * @param {string} [props.children]
 * @returns {React.Element}
 */
function ProgressRing (props) {
  const { children, className, type, value: _value, indeterminateValue, ...passedProps } = props

  const indeterminate = isNaN(_value)
  const value = indeterminate
    ? NaN
    : Math.min(1, Math.max(0, +_value))

  // Build values used inside
  const valueNow = indeterminate ? null : value * 100

  // Build class names for Progress Ring elements
  const clsName = buildClassName('progress-ring', className, [ type ], {
    completed: value === 1,
    indeterminate: isNaN(value)
  })

  const svgContainerClsName = buildClassName([ 'progress-ring', 'progress' ])
  const svgCircleBgClsName = buildClassName([ 'progress-ring', 'circle-bg' ])
  const svgCircleStrokeClsName = buildClassName([ 'progress-ring', 'circle-stroke' ])

  const content = React.Children.count(children) === 0 ? null : (
    <span className={buildClassName([ 'progress-ring', 'content' ])}>
      {children}
    </span>
  )

  return (
    <div className={clsName} {...passedProps}>
      <div
        className={svgContainerClsName}
        role='progressbar'
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={valueNow}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox={`0 0 ${viewBox} ${viewBox}`}>
          <circle
            className={svgCircleBgClsName}
            r={circleRadius}
            cx={circlePosition}
            cy={circlePosition}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset='0'
          />
          <circle
            className={svgCircleStrokeClsName}
            r={circleRadius}
            cx={circlePosition}
            cy={circlePosition}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={drawStroke(indeterminate ? indeterminateValue : value)}
          />
        </svg>
      </div>
      {content}
    </div>
  )
}

ProgressRing.propTypes = propTypes
ProgressRing.defaultProps = defaultProps

export default ProgressRing

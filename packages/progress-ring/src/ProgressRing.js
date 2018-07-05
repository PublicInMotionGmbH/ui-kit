import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Progress ring content */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Current progress (between 0 and 1, or NaN for indeterminate) */
  value: PropTypes.number,

  /** Progress ring type */
  type: PropTypes.string
}

const defaultProps = {
  type: 'primary'
}

/**
 * Component which represents Progress ring.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.value]
 * @param {string} [props.type]
 * @param {string} [props.children]
 * @returns {React.Element}
 */
function ProgressRing (props) {
  const { children, className, type, styles, value, ...passedProps } = props

  const _value = value * 100

  // Build values used inside
  const valueNow = isNaN(_value) ? null : _value

  // Build class names for Progress Ring elements
  const clsName = buildClassName('progress-ring', className, [ type ], {
    completed: _value >= 100,
    indeterminate: isNaN(_value)
  })

  const svgContainerClsName = buildClassName([ 'progress-ring', 'progress' ])

  const svgCircleBgClsName = buildClassName([ 'progress-ring', 'circle-bg' ])

  const svgCircleStrokeClsName = buildClassName([ 'progress-ring', 'circle-stroke' ])

  // Values for build svg
  const strokeDasharray = 164
  const circlePosition = 30
  const circleRadius = 26
  const viewBox = 60

  /**
   * Update value when is not in range or non-digital character
   * @param {number} _value
   */
  const drawStroke = (_value) => {
    if (_value < 0) {
      _value = 0
    } else if (_value > 100) {
      _value = 100
    } else if (isNaN(_value)) {
      _value = 25
    }

    const result = strokeDasharray - (strokeDasharray * (_value / 100))

    return result
  }

  return (
    <div style={styles} className={clsName} {...passedProps}>
      <div
        className={svgContainerClsName}
        role='progressbar'
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={valueNow}
      >
        <svg
          style={styles}
          xmlns='http://www.w3.org/2000/svg'
          viewBox={`0 0 ${viewBox} ${viewBox}`}>
          <circle
            className={svgCircleBgClsName}
            r={circleRadius}
            cx={circlePosition}
            cy={circlePosition}
            fill='transparent'
            strokeDasharray={strokeDasharray}
            strokeDashoffset='0' />
          <circle
            className={svgCircleStrokeClsName}
            transform={`rotate(-90 ${circlePosition} ${circlePosition})`}
            r={circleRadius}
            cx={circlePosition}
            cy={circlePosition}
            fill='transparent'
            strokeDasharray={strokeDasharray}
            strokeDashoffset={drawStroke(_value)} />
        </svg>
      </div>
      {children && <span className={buildClassName([ 'progress-ring', 'content' ])}>
        {children}
      </span>}
    </div>
  )
}

ProgressRing.propTypes = propTypes
ProgressRing.defaultProps = defaultProps

export default ProgressRing

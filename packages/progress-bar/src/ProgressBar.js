import React from 'react'
import PropTypes from 'prop-types'

import { prefix, buildClassName } from '@talixo/shared'

/**
 * Component which represents Progress Bar.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.type]
 * @param {string} [props.size]
 * @param {boolean} props.striped
 * @param {boolean} props.smooth
 * @param {number} props.value  between 0 and 1
 * @returns {React.Element}
 */
function ProgressBar (props) {
  const { className, value, type, size, striped, smooth, children, ...passedProps } = props

  // Build a number value
  const v = parseFloat(value)

  // Calculate bar percentage
  const percentage = isNaN(v) ? NaN : 100 * Math.min(Math.max(v, 0), 1)

  // Build styles for inner bar
  const style = isNaN(percentage) ? null : { width: percentage + '%' }

  // Build class name for wrapper element
  const clsName = buildClassName(
    'progress-bar',
    className,
    { indeterminate: isNaN(v) },
    { striped, smooth },
    [ type, size ]
  )

  const label = children ? (
    <div className={prefix('progress-bar', 'label')}>
      {children}
    </div>
  ) : null

  const shadow = children ? (
    <div className={prefix('progress-bar', 'shadow')} aria-hidden='true'>
      {children}
    </div>
  ) : null

  // Build class name for progress bar itself
  const innerClsName = prefix('progress-bar', 'inner')

  return (
    <div className={clsName} {...passedProps} role='progressbar'>
      <div className={innerClsName} style={style}>{label}</div>
      {shadow}
    </div>
  )
}

ProgressBar.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Progress bar style type */
  type: PropTypes.oneOf([ 'error', 'success', 'info', 'warning' ]),

  /** Progress, between 0 and 1 */
  value: PropTypes.number,

  /** Should progress bar be striped? */
  striped: PropTypes.bool,

  /** Should it be smoothly animated? */
  smooth: PropTypes.bool,

  /** Progress bar size */
  size: PropTypes.oneOf([ 'small' ]),

  /** Label */
  children: PropTypes.node
}

ProgressBar.defaultProps = {
  striped: false,
  smooth: true
}

export default ProgressBar

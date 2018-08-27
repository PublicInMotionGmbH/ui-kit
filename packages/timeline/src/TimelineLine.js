import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'timeline-line'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Short version of timeline line */
  short: PropTypes.bool,

  /** Line has special styles */
  special: PropTypes.bool
}

/**
 * Component which represents Timeline.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {bool} [props.short]
 * @param {bool} [props.special]
 * @returns {React.Element}
 */
function TimelineLine (props) {
  const { special, short, className } = props

  const clsName = buildClassName(moduleName, className, { special, short })

  return (
    <div className={clsName} />
  )
}

TimelineLine.displayName = 'TimelineLine'

TimelineLine.propTypes = propTypes

export default TimelineLine

import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'timeline-line'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

const defaultProps = {
}

/**
 * Component which represents Timeline.
 *
 * @param {object} props
 * @param {string} [props.className]
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
TimelineLine.defaultProps = defaultProps

export default TimelineLine

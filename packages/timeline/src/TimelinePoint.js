import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'timeline-point'

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
function TimelinePoint (props) {
  const { children, special, className } = props

  const clsName = buildClassName(moduleName, className, { special })

  return (
    <div className={clsName}>
      {children}
    </div>
  )
}

TimelinePoint.displayName = 'TimelinePoint'

TimelinePoint.propTypes = propTypes
TimelinePoint.defaultProps = defaultProps

export default TimelinePoint

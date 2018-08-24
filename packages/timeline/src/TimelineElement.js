import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'timeline-element'

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
function TimelineElement (props) {
  const { time, children, className } = props

  const clsName = buildClassName(moduleName, className)
  const clsNameIcon = buildClassName([moduleName, 'icon'], className)
  const clsNamePointer = buildClassName([moduleName, 'pointer'], className)
  const clsNameTime = buildClassName([moduleName, 'time'], className)

  return (
    <div className={clsName}>
      <div className={clsNameIcon}>
        {children}
      </div>

      <div className={clsNamePointer} />

      <div className={clsNameTime}>
        {time}
      </div>
    </div>
  )
}

TimelineElement.displayName = 'TimelineElement'

TimelineElement.propTypes = propTypes
TimelineElement.defaultProps = defaultProps

export default TimelineElement

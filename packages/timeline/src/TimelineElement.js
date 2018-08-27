import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'timeline-element'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Chidren inside Timeline */
  children: PropTypes.node,

  /** Time to render in component */
  time: PropTypes.string
}

/**
 * Component which represents Timeline.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {node} [props.children]
 * @param {string} [props.time]
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
      {time &&
        <div className={clsNameTime}>
          {time}
        </div>}
    </div>
  )
}

TimelineElement.displayName = 'TimelineElement'

TimelineElement.propTypes = propTypes

export default TimelineElement

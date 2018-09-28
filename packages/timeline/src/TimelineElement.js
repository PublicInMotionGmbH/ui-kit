import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'timeline-element'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Content to put inside */
  children: PropTypes.node,

  /** Time to render in component */
  time: PropTypes.string
}

/**
 * Component which represents timeline extended elements.
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
  const clsNameIcon = buildClassName([moduleName, 'icon'])
  const clsNamePointer = buildClassName([moduleName, 'pointer'])
  const clsNameTime = buildClassName([moduleName, 'time'])

  const timeElement = time ? (
    <div className={clsNameTime}>
      {time}
    </div>
  ) : null

  return (
    <div className={clsName}>
      <div className={clsNameIcon}>
        {children}
      </div>
      <div className={clsNamePointer} />
      {timeElement}
    </div>
  )
}

TimelineElement.displayName = 'TimelineElement'

TimelineElement.propTypes = propTypes

export default TimelineElement

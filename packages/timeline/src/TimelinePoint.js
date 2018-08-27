import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'timeline-point'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Chidren inside Timeline */
  children: PropTypes.node,

  /** Line has special styles */
  special: PropTypes.bool
}

/**
 * Component which represents Timeline.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {node} [props.children]
 * @param {bool} [props.special]
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

export default TimelinePoint

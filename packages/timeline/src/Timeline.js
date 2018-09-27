import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'timeline'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Timeline elements - points and lines */
  children: PropTypes.node
}

/**
 * Component which represents timeline.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {node} [props.children]
 * @returns {React.Element}
 */
function Timeline (props) {
  const { className, children, ...passedProps } = props
  const clsName = buildClassName(moduleName, className)

  return (
    <div className={clsName} {...passedProps}>
      {children}
    </div>
  )
}

Timeline.displayName = 'Timeline'

Timeline.propTypes = propTypes

export default Timeline

import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'timeline'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Chidren inside Timeline */
  children: PropTypes.node
}

/**
 * Component which represents Timeline.
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
    <div className={clsName} {...passedProps} >
      {children}
    </div>
  )
}

Timeline.displayName = 'Timeline'

Timeline.propTypes = propTypes

export default Timeline

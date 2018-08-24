import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'timeline'

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
function Timeline (props) {
  const { className, ...passedProps } = props
  const clsName = buildClassName(moduleName, className)

  return (
    <div className={clsName} {...passedProps} >
      {/* {children} */}
    </div>
  )
}

Timeline.displayName = 'Timeline'

Timeline.propTypes = propTypes
Timeline.defaultProps = defaultProps

export default Timeline

import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/shared'

const moduleName = prefix('control-group')

/**
 * Component which represents ControlGroup.
 *
 * @param {object} props
 * @param {*} [props.children]
 * @param {string} [props.className]
 * @param {string} [props.orientation]
 * @param {string} [props.position]
 * @returns {React.Element}
 */
function ControlGroup (props) {
  const { children, className, orientation, position, ...passedProps } = props

  const classNames = cls(className, moduleName, {
    [`${moduleName}--${orientation}`]: true,
    [`${moduleName}--${orientation}-${position}`]: true
  })

  return (
    <div className={classNames} {...passedProps}>
      {children}
    </div>
  )
}

ControlGroup.propTypes = {
  /** Grouped elements */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Orientation of grouped elements */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),

  /** Position of the group */
  position: PropTypes.oneOf(['left', 'center', 'right'])
}

ControlGroup.defaultProps = {
  orientation: 'horizontal',
  position: 'left'
}

export default ControlGroup

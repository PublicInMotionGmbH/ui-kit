import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Tooltip } from '@talixo/tooltip'

/**
 * Component which represents Step.
 *
 * @param {object} props
 * @param {boolean} [props.active]
 * @param {*} [props.children]
 * @param {string} [props.className]
 * @param {boolean} [props.disabled]
 * @param {function} [props.onClick]
 * @param {string} [props.type]
 * @returns {React.Step}
 */
function Step (props) {
  const { active, children, className, disabled, onClick, type, typeClassName, ...passedProps } = props

  // Build element class name
  const classNames = buildClassName([ 'navigation', 'step' ], className, { active, disabled })

  return (
    <Tooltip position='top' render={() => (<span>{children}</span>)}>
      <li onClick={onClick} className={classNames} {...passedProps} />
    </Tooltip>
  )
}

Step.propTypes = {
  /** Active state */
  active: PropTypes.bool,

  /** Step items */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Disabled state */
  disabled: PropTypes.bool,

  /** Function passed to element */
  onClick: PropTypes.func
}

Step.defaultProps = {
  active: false,
  disabled: false
}

export default Step

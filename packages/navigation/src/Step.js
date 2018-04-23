import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Tooltip } from '@talixo/tooltip'

export const moduleName = 'navigation'

const propTypes = {
  /** Active state */
  active: PropTypes.bool,

  /** Step items */
  children: PropTypes.node,

  /** Completed state */
  completed: PropTypes.bool,

  /** Additional class name */
  className: PropTypes.string,

  /** Disabled state */
  disabled: PropTypes.bool,

  /** Function passed to element */
  onClick: PropTypes.func
}

const defaultProps = {
  active: false,
  disabled: false
}

/**
 * Component which represents Step.
 *
 * @param {object} props
 * @param {boolean} [props.active]
 * @param {*} [props.children]
 * @param {boolean} [props.completed]
 * @param {string} [props.className]
 * @param {boolean} [props.disabled]
 * @param {function} [props.onClick]
 * @returns {React.Step}
 */
function Step (props) {
  const { active, children, completed, className, disabled, onClick, ...passedProps } = props

  // Build element class name
  const classNames = buildClassName([ moduleName, 'step' ], className, { active, completed, disabled })

  return (
    <Tooltip position='top' render={() => (<span>{children}</span>)}>
      <li onClick={onClick} className={classNames} {...passedProps} />
    </Tooltip>
  )
}

Step.propTypes = propTypes

Step.defaultProps = defaultProps

export default Step

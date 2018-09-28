import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Node element to display inside badge */
  children: PropTypes.node,

  /** Type of badge */
  type: PropTypes.oneOf([ 'primary', 'secondary', 'tertiary', 'error', 'warning', 'info', 'success' ]),

  /** Should it look like a pill? */
  pill: PropTypes.bool,

  /** Handler to allow "removing" badges; "remove" button will be shown then */
  onRemove: PropTypes.func,

  /** Content in "remove" button when it's available */
  removeText: PropTypes.node
}

const defaultProps = {
  pill: false,
  removeText: '×'
}

/**
 * Component which represents badge
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {node} [props.children]
 * @param {object} [props.style]
 */
function Badge (props) {
  const { children, className, type, pill, onRemove, removeText, ...passedProps } = props

  const clsName = buildClassName('badge', className, [ type ], {
    pill,
    interactive: !!props.onClick
  })

  const removeButton = onRemove ? (
    <button className={buildClassName('badge__remove')} onClick={onRemove}>
      {removeText}
    </button>
  ) : null

  return (
    <span className={clsName} {...passedProps}>
      <span className={buildClassName('badge__content')}>
        {children}
      </span>
      {removeButton}
    </span>
  )
}

Badge.displayName = 'Badge'

Badge.propTypes = propTypes
Badge.defaultProps = defaultProps

export default Badge

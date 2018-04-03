import React from 'react'
import PropTypes from 'prop-types'

import Icon from '@talixo/icon'

import { buildClassName } from '@talixo/shared'

/**
 * Component which represents action within table
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.icon]
 * @param {string|*} [props.label]
 * @param {boolean} [props.warn]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function Action (props) {
  const { className, icon, warn, label, ...passedProps } = props

  const clsName = buildClassName('table__action', className, { warn })

  return (
    <button type='button' className={clsName} {...passedProps}>
      <Icon name={icon} />
      <span>{label}</span>
    </button>
  )
}

Action.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Icon name to represent action */
  icon: PropTypes.string.isRequired,

  /** Label to represent action */
  label: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]).isRequired,

  /** Should be handled carefully? Color change and maybe confirmation. */
  warn: PropTypes.bool
}

Action.defaultProps = {
  warn: false
}

export default Action

import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/shared'

const moduleName = prefix('table__actions')

/**
 * Component which represents Table row cell with actions.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {boolean} [props.vertical]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function ActionsCell (props) {
  const { className, vertical, children, ...passedProps } = props

  const clsName = cls(moduleName, className, {
    [`${moduleName}--vertical`]: vertical
  })

  return (
    <td className={clsName} {...passedProps}>
      {children}
    </td>
  )
}

ActionsCell.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  children: PropTypes.node,

  vertical: PropTypes.bool
}

ActionsCell.defaultProps = {
  vertical: false
}

export default ActionsCell

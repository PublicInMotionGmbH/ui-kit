import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/shared'

import Cell from './Cell'

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
    <Cell className={clsName} {...passedProps}>
      {children}
    </Cell>
  )
}

ActionsCell.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Actions which should be shown inside */
  children: PropTypes.node,

  /** Should actions be aligned vertically? */
  vertical: PropTypes.bool
}

ActionsCell.defaultProps = {
  vertical: false
}

export default ActionsCell

import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/shared'

const moduleName = prefix('table')

/**
 * Component which represents Table.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {boolean} [props.condensed]
 * @param {boolean} [props.fixed]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function Table (props) {
  const { className, condensed, fixed, children, ...passedProps } = props

  const clsName = cls(moduleName, className, {
    [`${moduleName}--condensed`]: condensed,
    [`${moduleName}--fixed`]: fixed
  })

  return (
    <table className={clsName} {...passedProps}>
      {children}
    </table>
  )
}

Table.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  condensed: PropTypes.bool,

  fixed: PropTypes.bool,

  children: PropTypes.node
}

Table.defaultProps = {
  condensed: false,
  fixed: false
}

export default Table

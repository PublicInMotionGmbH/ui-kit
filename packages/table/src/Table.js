import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Should table be condensed (more content visible)? */
  condensed: PropTypes.bool,

  /** Should table have fixed layout? */
  fixed: PropTypes.bool,

  /** `Head`, `Body` and `Footer` components */
  children: PropTypes.node
}

const defaultProps = {
  condensed: false,
  fixed: false
}

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

  const clsName = buildClassName('table', className, { condensed, fixed })

  return (
    <table className={clsName} {...passedProps}>
      {children}
    </table>
  )
}

Table.propTypes = propTypes
Table.defaultProps = defaultProps

export default Table

import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Lead content */
  children: PropTypes.node
}

/**
 * Component which represents article/page lead.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function Lead (props) {
  const { className, children, ...passedProps } = props

  return (
    <p className={buildClassName('lead', className)} {...passedProps}>
      {children}
    </p>
  )
}

Lead.displayName = 'Lead'

Lead.propTypes = propTypes

export default Lead

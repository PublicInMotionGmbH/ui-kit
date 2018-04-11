import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

/**
 * Component which represents breadcrumbs list.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.children]
 * @param {*} [props.divider]
 * @returns {React.Element}
 */
function Breadcrumbs (props) {
  const { children, className, divider, ...passedProps } = props

  const mappedChildren = React.Children.map(children, (child, i) => {
    return (
      <span key={i}>
        {child}
        {i < children.length - 1 ? <div className='divider'>{divider}</div> : null}
      </span>
    )
  })

  return (
    <ul className={buildClassName('breadcrumbs', className)} {...passedProps}>
      {mappedChildren}
    </ul>
  )
}

Breadcrumbs.propTypes = {
  /** All breadcrumbs below */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Divider */
  divider: PropTypes.node
}

Breadcrumbs.defaultProps = {
  divider: '/'
}

export default Breadcrumbs

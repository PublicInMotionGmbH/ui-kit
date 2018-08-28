import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'address-path'

const propTypes = {
  /** Address Elements to be displayed inside path. */
  children: PropTypes.node.isRequired,

  /** Additional class name passed to wrapper. */
  className: PropTypes.string
}

/**
 *
 * @param props
 * @param {*} children
 * @param {string} className
 * @returns {React.Element}
 */
function AddressPath (props) {
  const { children, className, ...passedProps } = props

  const lastIndex = children.length - 1
  const lastPathIndex = lastIndex - 1

  // Generate classNames
  const wrapper = buildClassName(moduleName, className)
  const pathCls = buildClassName([moduleName, 'path'])
  const elementCls = index => buildClassName([moduleName, 'point'], null, { 'last-path': lastPathIndex === index })

  // Generate Address elements and apply path styles
  const elements = React.Children.map(children, (element, index) => (
    <div className={elementCls(index)}>
      {index === lastIndex ? null : <span className={pathCls} />}
      {element}
    </div>
  ))

  return (
    <div className={wrapper} {...passedProps}>
      {elements}
    </div>
  )
}

AddressPath.propTypes = propTypes

export default AddressPath

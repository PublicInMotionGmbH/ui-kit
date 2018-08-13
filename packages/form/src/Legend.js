import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'form-legend'

const propTypes = {
  /** Aside Legend */
  aside: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Legend content */
  children: PropTypes.node
}

/**
 * Component which represents Legend.
 *
 * @param {object} props
 * @param {*} [props.aside]
 * @param {*} [props.children]
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function Legend (props) {
  const { aside, className, children, ...passedProps } = props

  const clsName = buildClassName(moduleName, className)
  const contentClsName = buildClassName([ moduleName, 'content' ])
  const asideClsName = buildClassName([ moduleName, 'aside' ])

  const asideElement = aside == null ? null : (
    <aside className={asideClsName}>
      {aside}
    </aside>
  )

  return React.Children.count(children) === 0 ? null : (
    <legend className={clsName} {...passedProps}>
      <div className={contentClsName}>
        {children}
      </div>
      {asideElement}
    </legend>
  )
}

Legend.displayName = 'Legend'

Legend.propTypes = propTypes

export default Legend

import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

export const moduleName = 'form'

const propTypes = {
  /** Children to be put inside form. */
  children: PropTypes.node,

  /** Additional class name. */
  className: PropTypes.string,

  /** Component to be displayed in footer. */
  footerComponent: PropTypes.node
}

/**
 * Component which represents Form.
 *
 * @param {object} [props]
 * @param {*} [props.children]
 * @param {string} [props.className]
 * @param {*} [props.footerComponent]
 * @returns {React.Element}
 */
function Form (props) {
  const {
    children,
    className,
    footerComponent,
    ...passedProps
  } = props
  const formCls = buildClassName(moduleName, className)
  const contentCls = buildClassName([moduleName, 'content'])
  const footerCls = buildClassName([moduleName, 'footer'])

  return (
    <form className={formCls} {...passedProps}>
      <div className={contentCls}>
        {children}
      </div>
      {
        footerComponent &&
        <div className={footerCls}>
          {footerComponent}
        </div>
      }
    </form>
  )
}

Form.propTypes = propTypes

export default Form

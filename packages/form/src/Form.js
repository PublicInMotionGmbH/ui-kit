import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

export const moduleName = 'form'

/**
 * Component which represents Form.
 *
 * @param {object} props
 * @param {string} [props.className]
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

Form.propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

Form.defaultProps = {
}

export default Form

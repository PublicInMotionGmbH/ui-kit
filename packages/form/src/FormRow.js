import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

export const moduleName = 'form-row'

const propTypes = {
  /** Additional class name. */
  className: PropTypes.string,

  /** Displayed error message. */
  start: PropTypes.node,

  /** Displayed hint message. */
  children: PropTypes.node,

  /** Displayed hint message. */
  end: PropTypes.node,

  /** Should position elements horizontally? */
  horizontal: PropTypes.bool,

  /** Only for 'horizontal': should spread input when there is no hint? */
  spread: PropTypes.bool
}

const defaultProps = {
}

/**
 * Component which represents form field.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {*} [props.start]
 * @param {*} [props.children]
 * @param {*} [props.end]
 * @param {boolean} [props.horizontal]
 * @param {boolean} [props.spread]
 *
 * @returns {React.Element}
 */
function FormRow (props) {
  const { horizontal, spread, start, children, end, className, ...passedProps } = props

  const modifiers = {
    end: end != null,
    horizontal,
    spread
  }

  const rowClsName = buildClassName(moduleName, className, modifiers)
  const wrapperClsName = buildClassName([ moduleName, 'wrapper' ])
  const innerClsName = buildClassName([ moduleName, 'inner' ])
  const startClsName = buildClassName([ moduleName, 'start' ])
  const contentClsName = buildClassName([ moduleName, 'content' ])
  const endClsName = buildClassName([ moduleName, 'end' ])

  return (
    <div className={rowClsName} {...passedProps}>
      <div className={startClsName}>{start}</div>
      <div className={wrapperClsName}>
        <div className={innerClsName}>
          <div className={contentClsName}>{children}</div>
        </div>
        <div className={endClsName}>{end}</div>
      </div>
    </div>
  )
}

FormRow.displayName = 'FormRow'

FormRow.propTypes = propTypes
FormRow.defaultProps = defaultProps

export default FormRow

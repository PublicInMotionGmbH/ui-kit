import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { getColorIndex } from './utils'

export const moduleName = 'legend-item'

const propTypes = {
  /** Additional wrapper className */
  className: PropTypes.string,

  /** Colorbox color */
  color: PropTypes.string,

  /** Indicates if item is disabled */
  disabled: PropTypes.bool,

  /** Id of the element */

  id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),

  /** onClick callback function */
  onClick: PropTypes.func,

  /** Data series name */
  label: PropTypes.string,

  /** Data series value */
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])
}

const defaultProps = {
  disabled: false
}

/**
 *
 * @param {object} [props]
 * @param {string} [props.className]
 * @param {string} [props.color]
 * @param {bool} [props.disabled]
 * @param {object} [props.id]
 * @param {function} [props.onClick]
 * @param {string} [props.label]
 * @param {string|number} [props.value]
 * @returns {ReactElement}
 */
function LegendItem (props) {
  const { className, color, disabled, id, onClick, label, value } = props
  const itemCls = buildClassName(`${moduleName}`, className, {
    clickable: onClick,
    disabled: disabled
  })
  const colorboxCls = buildClassName(`${moduleName}__colorbox`, null, [getColorIndex(id)])
  const labelCls = buildClassName(`${moduleName}__label`)

  return (
    <div onClick={onClick} className={itemCls}>
      <div
        style={(color && { backgroundColor: color }) || {}}
        className={colorboxCls}
      />
      <div className={labelCls}>{ label }</div>
      <div className={labelCls}> { value && `(${value})` }</div>
    </div>
  )
}

LegendItem.propTypes = propTypes

LegendItem.defaultProps = defaultProps

LegendItem.displayName = 'LegendItem'

export default LegendItem

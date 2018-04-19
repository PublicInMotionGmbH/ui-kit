import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'legend-item'

/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
function LegendItem (props) {
  const {
    className,
    color,
    disabled,
    id,
    onClick,
    title,
    value
  } = props
  const itemCls = buildClassName(`${moduleName}`, className, {
    clickable: onClick,
    disabled: disabled
  })
  const colorboxCls = buildClassName(`${moduleName}__colorbox`, null, [id])
  const titleCls = buildClassName(`${moduleName}__title`)

  return (
    <div onClick={onClick} className={itemCls}>
      <div
        style={color && {backgroundColor: color}}
        className={colorboxCls}
      />
      <div
        className={titleCls}
      >
        { title } { value && `(${value})` }
      </div>
    </div>
  )
}

LegendItem.propTypes = {
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
  title: PropTypes.string,

  /** Data series value */
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])
}

LegendItem.defaultProps = {
  disabled: false
}

export default LegendItem

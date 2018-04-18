import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'legend'

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
    title,
    onClick
  } = props
  const itemCls = buildClassName(`${moduleName}__item`, className, {
    clickable: onClick,
    disabled: disabled
  })
  const colorboxCls = buildClassName(`${moduleName}__colorbox`)

  return (
    <div onClick={onClick} className={itemCls}>
      <div
        style={{backgroundColor: color}}
        className={`${colorboxCls} ${colorboxCls}--${id}`}
      />
      <span>{ title }</span>
    </div>
  )
}

LegendItem.propTypes = {
  disabled: PropTypes.bool
}

LegendItem.defaultProps = {
  disabled: false
}

/**
 * Component which represents Legend.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function Legend (props) {
  const {
    className,
    dataItems,
    direction,
    onClick,
    style,
    ...passedProps
  } = props
  const wrapperCls = buildClassName(moduleName, null, [ direction ])

  return (
    <div className={wrapperCls} style={style} {...passedProps}>
      {
        dataItems.map(item => (
          <LegendItem
            id={item.id}
            className={item.className}
            disabled={item.disabled}
            color={item.color}
            title={item.title || item.label}
            key={item.title || item.label}
            onClick={onClick && ((e) => onClick(item, e))}
          />
        ))
      }
    </div>
  )
}

Legend.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  dataItems: PropTypes.array,
  /** Horizontal or vertical. */
  direction: PropTypes.string
}

Legend.defaultProps = {
  dataItems: [],
  direction: 'vertical'
}

export default Legend

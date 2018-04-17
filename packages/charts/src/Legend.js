import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'legend'

function LegendItem (props) {
  const {
    className,
    color,
    id,
    title,
    onClick
  } = props
  const colorboxCls = buildClassName(`${moduleName}__colorbox`)
  return (
    <div onClick={onClick} className={className}>
      <div
        style={{backgroundColor: color}}
        className={`${colorboxCls} ${colorboxCls}--${id}`}
      />
      <span>{ title }</span>
    </div>
  )
}

/**
 * Component which represents Legend.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function Legend (props) {
  const { className, dataItems, onClick, ...passedProps } = props
  console.log(dataItems)
  const wrapperCls = buildClassName(moduleName)

  return (
    <div className={wrapperCls} {...passedProps}>
      {
        dataItems.map(item => (
          <LegendItem
            id={item.id}
            className={item.className}
            color={item.color}
            title={item.title || item.label}
            onClick={e => onClick(item, e)}
          />
        ))
      }
    </div>
  )
}

Legend.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  dataItems: PropTypes.array
}

Legend.defaultProps = {
  dataItems: []
}

export default Legend

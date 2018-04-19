import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import LegendItem from './LegendItem'

const moduleName = 'legend'

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
        dataItems.map((item, index) => (
          <LegendItem
            className={item.className}
            color={item.color}
            disabled={item.disabled}
            id={item.id || index}
            key={item.title || item.label}
            onClick={onClick && ((e) => onClick(item, index, e))}
            title={item.title || item.label}
            value={item.y || item.angle}
          />
        ))
      }
    </div>
  )
}

Legend.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** TODO: add a description of dataItem */
  dataItems: PropTypes.array,

  /** Horizontal or vertical. */
  direction: PropTypes.string,

  /** onClick callback, gets the clicked item, index and event as parameter */
  onClick: PropTypes.func,

  /** Additional wrapper styling */
  style: PropTypes.object
}

Legend.defaultProps = {
  dataItems: [],
  direction: 'vertical'
}

export default Legend

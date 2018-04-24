import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import LegendItem from './LegendItem'

const moduleName = 'legend'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Data items to be displayed */
  dataItems: PropTypes.arrayOf(PropTypes.shape({

    /** Additional class name */
    className: PropTypes.string,

    /** Color of data series */
    color: PropTypes.string,

    /** Indicates if series is disabled */
    disabled: PropTypes.bool,

    /** Data series label */
    label: PropTypes.string,

    /** Data series value */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })),

  /** Horizontal or vertical. */
  direction: PropTypes.string,

  /** onClick callback, gets the clicked item, index and event as parameter */
  onClick: PropTypes.func
}

const defaultProps = {
  dataItems: [],
  direction: 'vertical'
}

/**
 * Component which represents Chart Legend.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {object[]} [props.dataItems]
 * @param {string} [props.dataItems.className]
 * @param {string} [props.dataItems.color]
 * @param {bool} [props.dataItems.disabled]
 * @param {string} [props.dataItems.label]
 * @param {string|number} [props.dataItems.value]
 * @param {string} [props.direction]
 * @param {function} [props.onClick]
 * @returns {React.Element}
 */
function Legend (props) {
  const {
    className,
    dataItems,
    direction,
    onClick,
    ...passedProps
  } = props
  const wrapperCls = buildClassName(moduleName, className, [ direction ])

  return (
    <div className={wrapperCls} {...passedProps}>
      {
        dataItems.map((item, index) => (
          <LegendItem
            className={item.className}
            color={item.color}
            disabled={item.disabled}
            id={index}
            key={`${item.label}--${index}`}
            onClick={onClick && ((e) => onClick(item, index, e))}
            label={item.label}
            value={item.value}
          />
        ))
      }
    </div>
  )
}

Legend.propTypes = propTypes

Legend.defaultProps = defaultProps

export default Legend

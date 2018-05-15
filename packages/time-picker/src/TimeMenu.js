import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { buildClassName } from '@talixo/shared'

export const moduleName = 'time-menu'

const propTypes = {
  /** Additional class name. */
  className: PropTypes.string,

  /** Number of data columns. */
  columns: PropTypes.number,

  /** Array of time values. */
  data: PropTypes.arrayOf(PropTypes.number).isRequired,

  /** Format of label. */
  format: PropTypes.string,

  /**  Event handler when menu value is selected. */
  onValueSelect: PropTypes.func,

  /** Time object passed to component. */
  value: PropTypes.object
}

const defaultProps = {
}

/**
 * Component which represents Time Menu.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {number} [props.columns]
 * @param {array} [props.data]
 * @param {string} [props.format]
 * @param {*} [props.onValueSelect]
 * @param {object} [props.value]
 *
 * @returns {React.Element}
 */
function TimeMenu (props) {
  const { children, className, columns, data, format, onValueSelect, style, value, ...passedProps } = props

  // Build class names
  const wrapperClsName = buildClassName(moduleName, className)
  const headerClsName = buildClassName([moduleName, 'header'])

  // Build wrapper style
  const wrapperStyle = columns
    ? { ...style, columnCount: columns }
    : style

  /**
   * Build menu buttons.
   *
   * @returns {React.Element}
   */
  function buildButtons () {
    // Map data to create buttons
    const buttons = data.map((_, i) => {
      let label = moment(_, format).format(format)
      const selected = moment(value).format(format) === label

      // Build class name for button
      const buttonClsName = buildClassName([moduleName, 'button'], null, { selected })

      return (
        <button
          key={i}
          className={buttonClsName}
          onMouseDown={() => props.onValueSelect(_)}
        >
          {label}
        </button>
      )
    })

    return buttons
  }

  return (
    <div
      className={wrapperClsName}
      style={wrapperStyle}
      {...passedProps}
    >
      <div className={headerClsName}>
        {children}
      </div>
      {buildButtons()}
    </div>
  )
}

TimeMenu.propTypes = propTypes

TimeMenu.defaultProps = defaultProps

export default TimeMenu

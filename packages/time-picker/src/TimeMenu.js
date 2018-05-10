import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { buildClassName } from '@talixo/shared'
import { Button } from '@talixo/button'

export const moduleName = 'time-menu'

const propTypes = {
  /** Additional class name. */
  className: PropTypes.string,

  /** Number of data columns */
  columns: PropTypes.number,

  /** Time data. */
  data: PropTypes.array.isRequired,

  /**  Event handler when menu value is selected. */
  onValueSelect: PropTypes.func
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
 * @param {*} [props.onValueSelect]
 *
 * @returns {React.Element}
 */
function TimeMenu (props) {
  const { children, className, columns, data, format, onValueSelect, style, ...passedProps } = props

  const wrapperClsName = buildClassName(moduleName, className)
  const headerClsName = buildClassName([moduleName, 'header'])

  const wrapperStyle = columns
    ? { ...style, columnCount: columns }
    : style

  function buildButtons () {
    const buttonClsName = buildClassName([moduleName, 'button'])

    const buttons = data.map((_, i) => {
      let label = moment(_, format).format(format)
      return (
        <Button
          key={i}
          className={buttonClsName}
          onClick={() => props.onValueSelect(_)}
        >
          {label}
        </Button>
      )
    })

    return buttons
  }

  return (
    <div className={wrapperClsName} style={wrapperStyle} {...passedProps}>
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

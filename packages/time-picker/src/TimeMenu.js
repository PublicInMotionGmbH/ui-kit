import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Button } from '@talixo/button'

export const moduleName = 'time-menu'

const propTypes = {
  /** Additional class name. */
  className: PropTypes.string,

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
 * @param {array} [props.data]
 * @param {*} [props.onValueSelect]
 *
 * @returns {React.Element}
 */
function TimeMenu (props) {
  const { className, data, onValueSelect, ...passedProps } = props

  const wrapperClsName = buildClassName(moduleName, className)

  function buildButtons () {
    const buttonClsName = buildClassName([moduleName, 'button'])

    const buttons = data.map((time, i) => (
      <Button
        key={i}
        className={buttonClsName}
        onClick={() => props.onValueSelect(time)}
      >
        {time.label}
      </Button>
    ))

    return buttons
  }

  return (
    <div className={wrapperClsName} {...passedProps}>
      {buildButtons()}
    </div>
  )
}

TimeMenu.propTypes = propTypes

TimeMenu.defaultProps = defaultProps

export default TimeMenu

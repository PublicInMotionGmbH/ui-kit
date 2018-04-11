import React from 'react'
import PropTypes from 'prop-types'

import { prefix, buildClassName } from '@talixo/shared'

/**
 * Component which represents Yes/No switcher.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.yesLabel]
 * @param {string} [props.noLabel]
 * @returns {React.Element}
 */
function Switcher (props) {
  const { className, noLabel, yesLabel, ...passedProps } = props

  const clsName = buildClassName('switcher', className, {
    disabled: props.disabled
  })

  return (
    <label className={clsName}>
      <input type='checkbox' {...passedProps} />
      <span>
        <span className={prefix('switcher__yes')}>{yesLabel}</span>
        <span className={prefix('switcher__no')}>{noLabel}</span>
      </span>
    </label>
  )
}

Switcher.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Label for "No" */
  noLabel: PropTypes.string,

  /** Label for "Yes" */
  yesLabel: PropTypes.string,

  /** Callback for change event */
  onChange: PropTypes.func
}

Switcher.defaultProps = {
  yesLabel: 'Yes',
  noLabel: 'No'
}

export default Switcher

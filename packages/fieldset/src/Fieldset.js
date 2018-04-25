import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'fieldset'

const propTypes = {
  /** All nodes inside fieldset */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string,

  /** Legend for fieldset */
  legend: PropTypes.string
}

/**
 * Component which represents Fieldset.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.legend]
 * @returns {React.Element}
 */
function Fieldset (props) {
  const { className, children, legend, ...passedProps } = props

  return (
    <div className={buildClassName(moduleName, className)} {...passedProps}>
      <h3 className={buildClassName([moduleName, 'legend'])}>
        {legend}
      </h3>
      {children}
    </div>
  )
}

Fieldset.propTypes = propTypes

export default Fieldset

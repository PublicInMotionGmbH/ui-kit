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
  const { className, children, legend, additionalLegend, ...passedProps } = props

  return (
    <div className={buildClassName(moduleName, className)} {...passedProps}>
      {legend && <span className={buildClassName([moduleName, 'legend'])}>
        {legend}
        {additionalLegend && <span className={buildClassName([moduleName, 'additional-legend'])}>
          {additionalLegend}
        </span>}
      </span>}

      {children}
    </div>
  )
}

Fieldset.propTypes = propTypes

export default Fieldset

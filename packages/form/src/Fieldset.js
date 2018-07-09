import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'fieldset'

const propTypes = {
  /** Aside Legend */
  asideLegend: PropTypes.node,

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
 * @param {*} [props.asideLegend]
 * @param {*} [props.children]
 * @param {string} [props.className]
 * @param {string} [props.legend]
 * @returns {React.Element}
 */
function Fieldset (props) {
  const { asideLegend, className, children, legend, ...passedProps } = props

  const asideLegendElement = asideLegend == null ? null : (
    <aside className={buildClassName([ moduleName, 'aside-legend' ])}>
      {asideLegend}
    </aside>
  )

  const legendElement = legend == null ? null : (
    <legend className={buildClassName([ moduleName, 'legend' ])}>
      {legend}
      {asideLegendElement}
    </legend>
  )

  return (
    <fieldset className={buildClassName(moduleName, className)} {...passedProps}>
      {legendElement}
      {children}
    </fieldset>
  )
}

Fieldset.propTypes = propTypes

export default Fieldset

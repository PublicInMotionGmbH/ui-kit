import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'fieldset'

const propTypes = {
  /** All nodes inside fieldset */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string
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
  const { className, children, ...passedProps } = props

  return (
    <fieldset className={buildClassName(moduleName, className)} {...passedProps}>
      {children}
    </fieldset>
  )
}

Fieldset.displayName = 'Fieldset'

Fieldset.propTypes = propTypes

export default Fieldset
